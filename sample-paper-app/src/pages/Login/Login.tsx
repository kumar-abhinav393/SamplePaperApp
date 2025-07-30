import { dialog } from "@/components/Modals/ResetPasswordModal";
import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import { getPasswordIcon } from "@/helpers/getPasswordIcon";
import { useLogin } from "@/hooks/useLogin";
import {
  Box,
  Button,
  Field,
  Fieldset,
  Flex,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login } = useLogin();
  const navigate = useNavigate();
  const textColor = useColorModeValue("black", "white");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordError = password !== "" && password.length < 8;
  const emailError = email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const handleSubmit = async () => {
    try {
      await login({ email, password });
      navigate("/filter-assignments");
    } catch {
      toaster.create({
        type: "error",
        title: "Login failed",
        description: "Please check your credentials and try again",
      });
    }
  };

  return (
    <Flex
      id="login"
      mx={"auto"}
      alignItems={"center"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <Flex w={"100%"} alignItems={"center"} flexDirection={"column"}>
        <Text
          fontWeight={"bold"}
          fontSize={["2xl", "2xl", "3xl", "3xl", "3xl"]}
        >
          Login
        </Text>
        <Flex
          mt={2}
          gap={2}
          alignItems={"center"}
          fontSize={["l", "l", "1xl", "1xl", "1xl"]}
        >
          <Text>No account yet?</Text>
          <Box onClick={() => navigate("/signup")}>
            <Text cursor={"pointer"} fontWeight={"bold"} color={"#3bc8f6d6"}>
              Signup
            </Text>
          </Box>
        </Flex>
        <Flex
          gap={2}
          alignItems={"center"}
          fontSize={["l", "l", "1xl", "1xl", "1xl"]}
        >
          <Text>Forgot Password?</Text>
          <Box
            onClick={() => {
              dialog.open("a", {
                title: "Reset Password",
                description: "EMAIL",
              });
            }}
          >
            <Text cursor={"pointer"} fontWeight={"bold"} color={"#3bc8f6d6"}>
              Change Password
            </Text>
          </Box>
          <dialog.Viewport />
        </Flex>
        <Flex pt={5}>
        <Button
          fontSize={"l"}
          color={textColor}
          bg={"#3bc8f6d6"}
          border={"1px solid black"}
          w={["310px", "350px", "400px", "450px"]}
        >
          LOG IN WITH GOOGLE
        </Button>
      </Flex>
      <Flex align="center" w={["310px", "350px", "400px", "450px"]} pt={3}>
        <Box flex="1" h="1px" bg="#444746" />
        <Text px={4} fontWeight="semibold" color={textColor}>
          OR
        </Text>
        <Box flex="1" h="1px" bg="#444746" />
      </Flex>
        <Flex
          mt={4}
          gap={2}
          alignItems={"column"}
          flexDirection={"column"}
          w={["310px", "350px", "400px", "450px"]}
          fontSize={["l", "l", "xl", "1xl", "1xl"]}
        >
          <form>
            <Fieldset.Root onSubmit={handleSubmit}>
              <Fieldset.Content>
                <Field.Root invalid={emailError}>
                  <Field.Label>EMAIL</Field.Label>
                  <Input
                    type="email"
                    value={email}
                    variant={"outline"}
                    placeholder="user@domain.com"
                    css={{ "--focus-color": "#3bc8f6d6" }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field.Root>

                <Field.Root invalid={passwordError}>
                  <Field.Label>PASSWORD</Field.Label>
                  <InputGroup
                    endElement={getPasswordIcon(showPassword, setShowPassword)}
                  >
                    <Input
                      value={password}
                      variant={"outline"}
                      placeholder="password >= 8"
                      css={{ "--focus-color": "#3bc8f6d6" }}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </Field.Root>
              </Fieldset.Content>
            </Fieldset.Root>
          </form>
        </Flex>
        
        <Flex mt={3} w={"100%"} justifyContent={"space-between"}>
          <Button
            color={textColor}
            bg={"#3bc8f6d6"}
            border={"1px solid black"}
            onClick={() => navigate("/")}
            fontSize={["xl", "xl", "1xl", "1xl", "1xl"]}
          >
            Cancel
          </Button>
          <Button
            color={textColor}
            bg={"#3bc8f6d6"}
            onClick={handleSubmit}
            border={"1px solid black"}
            disabled={!email || !password}
            fontSize={["xl", "xl", "1xl", "1xl", "1xl"]}
          >
            Login
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
