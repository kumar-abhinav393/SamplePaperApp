import { Button, Flex } from "@chakra-ui/react"

export const Authentication = () => {
  return (
    <Flex
      mx={"auto"}
      id="authentication"
      flexDirection={"column"}
      justifyContent={"center"}
      w={["80%", "80%", "45%", "35%", "35%"]}
    >
      <Button 
        mb={3}
        bg={"#3b82f6d6"}
        fontWeight={"bold"}
        fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
      >
        LOGIN WITH EMAIL
      </Button>
      <Button
        bg={"#3b82f6d6"}
        fontWeight={"bold"}
        fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
      >
        REGISTER WITH EMAIL
      </Button>
    </Flex>
  )
}