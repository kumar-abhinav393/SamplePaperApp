import { toaster } from "@/components/ui/toaster";
import { useLogin } from "@/hooks/useLogin";
import { Box, Button, Field, Flex, Input, Text } from "@chakra-ui/react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export const Login = () => {

  const navigate = useNavigate();
  const { login } = useLogin();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emailError =
    email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async() => {
    try{
      await login({email, password})
      navigate("/filter-assignments")
    } catch(error) {
      toaster.create({
        type: "error",
        title: "Login failed",
        description: "Please check your credentials and try again",
      })
      setEmail("")
      setPassword("")
    }
  }

  return (
    <Flex id="login"
      mx={"auto"}
      alignItems={"center"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <Flex
        w={"100%"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Text
          fontWeight={"bold"}
          fontSize={["2xl", "2xl", "3xl", "4xl", "4xl"]}
        >
          Login
        </Text>
        <Flex
          mt={2}
          gap={2}
          alignItems={"center"}
          fontSize={["l", "l", "1xl", "2xl", "2xl"]}
        >
          <Text>No account yet?</Text>
          <Box onClick={() => navigate("/signup")}>
            <Text
              cursor={"pointer"}
              fontWeight={"bold"}
              color={"#3b82f6d6"}
            >
              Signup
            </Text>
          </Box>
        </Flex>
        <Flex
          gap={2}
          alignItems={"center"}
          fontSize={["l", "l", "1xl", "2xl", "2xl"]}
        >
          <Text>Forgot Password?</Text>
          <Box>
            <Text
              cursor={"pointer"}
              fontWeight={"bold"}
              color={"#3b82f6d6"}
            >
              Change Password
            </Text>
          </Box>
        </Flex>
        <Flex
          mt={4}
          gap={2}
          flexDirection={"column"}
          alignItems={"flex-start"}
          w={["310px", "350px", "400px", "450px"]}
          fontSize={["l", "l", "xl", "1xl", "1xl"]}
        >
          <Text>EMAIL</Text>
          <Field.Root invalid={emailError}>
            <Input
              type="email"
              value={email}
              variant={"outline"}
              placeholder="user@domain.com"
              css={{ "--focus-color": "#3b82f6d6" }}
              onChange={(e) => setEmail(e.target.value)}
              fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
            />
            {emailError && (
              <Field.ErrorText>Please enter a valid email address</Field.ErrorText>
            )}
          </Field.Root>
          <Text mt={2}>PASSWORD</Text>
          <Input
            type="password"
            value={password}
            variant={"outline"}
            placeholder="password >= 8"
            css={{ "--focus-color": "#3b82f6d6" }}
            fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Flex>
        <Flex
          mt={4}
          w={"100%"}
          justifyContent={"space-between"}
        >
          <Button
            color={"white"}
            bg={"#3b82f6d6"}
            fontWeight={"bold"}
            onClick={() => navigate("/")}
            fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
          >
            Cancel
          </Button>
          <Button
            color={"white"}
            bg={"#3b82f6d6"}
            fontWeight={"bold"}
            onClick={handleSubmit}
            disabled={!email || !password}
            fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
          >
            Login
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}