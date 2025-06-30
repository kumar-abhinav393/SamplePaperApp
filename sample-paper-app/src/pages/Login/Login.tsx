import { Box, Button, Flex, Input, Text } from "@chakra-ui/react"

export const Login = () => {
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
          <Box>
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
          <Input
            variant={"outline"}
            placeholder="user@domain.com"
            css={{ "--focus-color": "#3b82f6d6" }}
            fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
          />
          <Text mt={2}>PASSWORD</Text>
          <Input
            type="password"
            variant={"outline"}
            placeholder="password >= 8"
            css={{ "--focus-color": "#3b82f6d6" }}
            fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
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
            fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
          >
            Cancel
          </Button>
          <Button
            disabled
            color={"white"}
            bg={"#3b82f6d6"}
            fontWeight={"bold"}
            fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
          >
            Login
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}