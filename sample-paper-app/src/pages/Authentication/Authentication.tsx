import { useColorModeValue } from "@/components/ui/color-mode";
import { Button, Flex } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export const Authentication = () => {

  const navigate = useNavigate();
  const textColor = useColorModeValue("black", "white")

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
        color={textColor}
        bg={"#3bc8f6d6"}
        fontWeight={"bold"}
        border={"1px solid black"}
        onClick={() => navigate("/login")}
        fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
      >
        LOGIN WITH EMAIL
      </Button>
      <Button
        color={textColor}
        bg={"#3bc8f6d6"}
        fontWeight={"bold"}
        border={"1px solid black"}
        onClick={() => navigate("/signup")}
        fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
      >
        REGISTER WITH EMAIL
      </Button>
    </Flex>
  )
}