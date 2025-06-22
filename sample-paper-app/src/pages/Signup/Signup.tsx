import { Flex, Box, Input, Button, Text } from "@chakra-ui/react"

export const Signup = () => {
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
          Create Account
        </Text>
        <Flex
          gap={2}
          alignItems={"center"}
          fontSize={["l", "l", "1xl", "2xl", "2xl"]}
        >
          <Text>Already Registered?</Text>
          <Box>
            <Text
              cursor={"pointer"}
              fontWeight={"bold"}
              color={"#3b82f6d6"}
            >
              Login
            </Text>
          </Box>
        </Flex>
        <Flex
          mt={4}
          flexDirection={"column"}
          alignItems={"flex-start"}
          w={["310px", "350px", "400px", "450px"]}
          fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
        >
          <Text>EMAIL</Text>
          <Input
            variant={"outline"}
            placeholder="user@domain.com"
            css={{ "--focus-color": "#3b82f6d6" }}
            fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
          />
          <Text mt={3}>PASSWORD</Text>
          <Input
            variant={"outline"}
            placeholder="password >= 8"
            css={{ "--focus-color": "#3b82f6d6" }}
            fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
          />
          <Text mt={3}>CONFIRM PASSWORD</Text>
          <Input
            variant={"outline"}
            placeholder="password >= 8"
            css={{ "--focus-color": "#3b82f6d6" }}
            fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
          />
          <Text mt={3}>DISPLAY NAME</Text>
          <Input
            variant={"outline"}
            placeholder="Robert Pinto"
            css={{ "--focus-color": "#3b82f6d6" }}
            fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
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
            color={"white"}
            bg={"#3b82f6d6"}
            fontWeight={"bold"}
            fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
          >
            Signup
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}