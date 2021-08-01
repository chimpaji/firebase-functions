import React, { useEffect } from "react";
import {
  VStack,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  HStack,
  FormErrorIcon,
  FormErrorMessage,
  Heading,
  List,
  ListItem,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { db, functions } from "../firebase";

const Homepage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [request, setRequest] = useState("");
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState(null);
  const { logout, user } = useAuth();

  const handleLike = (id) => {
    console.log(id);
    const handleProgramLike = functions.httpsCallable("handleProgramLike");
    handleProgramLike({ id })
      .then((res) => console.log(res))
      .catch((err) => err);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(request);
    const addProgramLang = functions.httpsCallable("addProgramLang");
    addProgramLang({ title: request })
      .then((res) => {
        console.log(res);
        setRequest("");
        onClose();
      })
      .catch((err) => err);
  };

  useEffect(() => {
    console.log("secret", process.env.REACT_APP_SECRET);
    const unsub = db.collection("program-lang").onSnapshot((snapshot) => {
      setLoading(true);
      const list = [];
      snapshot.docs.forEach((doc) => {
        console.log(doc.data());
        list.push({ ...doc.data(), id: doc.id });
      });
      setList(list);
      setLoading(false);
    });

    return unsub;
  }, []);
  return (
    <VStack w="full" h="100vh">
      <HStack p={2} w="full" justify="flex-end" borderBottomWidth="medium">
        <Button variant="ghost" onClick={onOpen}>
          Add Request
        </Button>
        <Button variant="ghost" onClick={logout}>
          Sign Out
        </Button>
      </HStack>
      <VStack flex={1} maxW={640}>
        <Heading size="xl" pt="10vh">
          Programming Request
        </Heading>
        <List w="full">
          {loading ? (
            <Box w="full" align="center" h={120}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Box>
          ) : (
            list.map((doc, index) => {
              console.log("doc", doc);
              const { title, likes, id, liked } = doc;
              return (
                <ListItem key={index} py={2}>
                  <Box
                    bg="gray.400"
                    display="flex"
                    rounded="base"
                    flexDirection="row"
                    w="full"
                    justifyContent="space-between"
                    p={2}
                    textColor="gray.800"
                  >
                    <Text>{title}</Text>
                    <HStack spacing={0}>
                      <Text>{likes}</Text>
                      <IconButton
                        icon={<FaArrowUp />}
                        variant="link"
                        color="gray.800"
                        onClick={() => handleLike(id)}
                      />
                    </HStack>
                  </Box>
                </ListItem>
              );
            })
          )}
        </List>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent alignSelf="center">
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <VStack w="full">
                  <FormLabel alignSelf="start">Programing Language</FormLabel>
                  <Input
                    placeholder="Type Name Here"
                    value={request}
                    type="text"
                    id="request"
                    onChange={(e) => setRequest(e.target.value)}
                  />
                  <Button type="submit" w="full" colorScheme="yellow">
                    Submit
                  </Button>
                </VStack>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default Homepage;

{
  /* <ListItem>
            <Box
              bg="gray.400"
              display="flex"
              rounded="base"
              flexDirection="row"
              w="full"
              justifyContent="space-between"
              p={2}
              textColor="gray.800"
            >
              <Text>Javascript</Text>
              <HStack spacing={0}>
                <Text>100</Text>
                <IconButton
                  icon={<FaArrowUp />}
                  variant="link"
                  color="gray.800"
                />
              </HStack>
            </Box>
          </ListItem>
        */
}
