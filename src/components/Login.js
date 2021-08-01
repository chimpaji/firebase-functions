import React, { useState } from "react";
import {
  Flex,
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Text,
  Link,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signup } = useAuth();
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setError("");
    console.log(email, password);
    const creden = signup(email, password).catch((err) =>
      setError(err.message)
    );
    console.log("creden", creden);
    setEmail("");
    setPassword("");
  };
  const handleSigninSubmit = (e) => {
    e.preventDefault();
    setError("");
    console.log(email, password);
    const creden = login(email, password)
      .then(() => {
        console.log("signup done");
      })
      .catch((err) => setError(err.message));

    console.log("creden", creden);
    setEmail("");
    setPassword("");
  };
  const [register, setRegister] = useState(false);

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      {register ? (
        <form onSubmit={handleSignupSubmit}>
          <VStack w={325} align="center" bg="gray.900" p={10} rounded="xl">
            <Heading size="lg">Signup</Heading>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                id="email"
                placeholder="xxx@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                placeholder="******"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {error && <p>{error}</p>}
            <Button colorScheme="blue" type="submit">
              Signup
            </Button>
            <HStack>
              <Text>Have account ald?</Text>
              <Link
                textDecorationLine="underline"
                onClick={() => setRegister(!register)}
              >
                Login Here🍦
              </Link>
            </HStack>
          </VStack>
        </form>
      ) : (
        <form onSubmit={handleSigninSubmit}>
          <VStack w={325} align="center" bg="gray.900" p={10} rounded="xl">
            <Heading size="lg">Login</Heading>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                id="email"
                placeholder="xxx@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                placeholder="******"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {error && <p>{error}</p>}
            <Button colorScheme="blue" type="submit">
              Login
            </Button>
            <HStack>
              <Text>Dont have account?</Text>
              <Link
                textDecorationLine="underline"
                onClick={() => setRegister(!register)}
              >
                Resister Here
              </Link>
            </HStack>
          </VStack>
        </form>
      )}
    </Flex>
  );
};

export default Login;
