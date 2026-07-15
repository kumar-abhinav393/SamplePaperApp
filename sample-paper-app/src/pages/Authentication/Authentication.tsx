import { useColorModeValue } from "@/components/ui/color-mode";
import { RippleButton } from "@/components/ui/RippleButton";
import { RouterPaths } from "@/global/enum";
import { Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

export const Authentication = () => {
  const navigate = useNavigate();
  const textColor = useColorModeValue("black", "white");

  return (
    <>
      <Flex
        mt={"30vh"}
        mx={"auto"}
        id="authentication"
        flexDirection={"column"}
        justifyContent={"center"}
        w={["80%", "80%", "45%", "35%", "35%"]}
      >
        <RippleButton
          mb={3}
          color={textColor}
          bg={"#3bc8f6d6"}
          fontWeight={"bold"}
          border={"1px solid black"}
          onClick={() => navigate("/login")}
          fontSize={["sm", "sm", "md", "lg", "lg"]}
          h={["30px", "30px", "30px", "40px", "40px"]}
        >
          LOGIN WITH EMAIL
        </RippleButton>
        <RippleButton
          color={textColor}
          bg={"#3bc8f6d6"}
          fontWeight={"bold"}
          border={"1px solid black"}
          onClick={() => navigate("/signup")}
          fontSize={["sm", "sm", "md", "lg", "lg"]}
          h={["30px", "30px", "30px", "40px", "40px"]}
        >
          REGISTER WITH EMAIL
        </RippleButton>
        <Flex mt={4} justifyContent={"center"} gap={4} fontSize={"sm"}>
          <ChakraLink asChild color={textColor}>
            <Link to={RouterPaths.Login}>Login</Link>
          </ChakraLink>
          <ChakraLink asChild color={textColor}>
            <Link to={RouterPaths.Signup}>Sign Up</Link>
          </ChakraLink>
        </Flex>
      </Flex>
    </>
  );
};
