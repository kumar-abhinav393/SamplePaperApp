import { useState } from "react";
import { useSignup } from "@/hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";
import { getPasswordIcon } from "@/helpers/getPasswordIcon";
import { useColorModeValue } from "@/components/ui/color-mode";
import {
  Flex,
  Box,
  Input,
  Button,
  Text,
  Fieldset,
  Field,
  InputGroup,
} from "@chakra-ui/react";

export const Signup = () => {
  const { signup } = useSignup();
  const navigate = useNavigate();
  const textColor = useColorModeValue("black", "white");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailError = email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordError = password !== "" && password.length < 8;

  const handleSubmit = async () => {
    const signupPromise = signup({ email, password, displayName });
    toaster.promise(signupPromise, {
      success: {
        title: "Successfully signed up!",
        description: "Welcome aboard!",
      },
      error: {
        title: "Signup failed",
        description: "Please check your details and try again.",
      },
      loading: { title: "Signing up...", description: "Please wait" },
    });
    try {
      if (password === confirmPassword) {
        await signupPromise;

        navigate("/login");
      }
    } catch (error: unknown) {
      console.log(error);
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
          Create Account
        </Text>
        <Flex
          gap={2}
          alignItems={"center"}
          fontSize={["l", "l", "1xl", "1xl", "1xl"]}
        >
          <Text>Already Registered?</Text>
          <Box onClick={() => navigate("/login")}>
            <Text cursor={"pointer"} fontWeight={"bold"} color={"#3bc8f6d6"}>
              Login
            </Text>
          </Box>
        </Flex>
        <Flex
          mt={4}
          fontSize={"l"}
          alignItems={"column"}
          flexDirection={"column"}
          w={["310px", "350px", "400px", "450px"]}
        >
          <form>
            <Fieldset.Root>
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

                <Field.Root>
                  <Field.Label>CONFIRM PASSWORD</Field.Label>
                  <InputGroup
                    endElement={getPasswordIcon(
                      showConfirmPassword,
                      setShowConfirmPassword
                    )}
                  >
                    <Input
                      variant={"outline"}
                      value={confirmPassword}
                      placeholder="password >= 8"
                      type={showConfirmPassword ? "text" : "password"}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      css={{
                        "--focus-color":
                          password === confirmPassword ? "#3bc8f6d6" : "red",
                      }}
                    />
                  </InputGroup>
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize={"l"}>DISPLAY NAME</Field.Label>
                  <Input
                    variant={"outline"}
                    value={displayName}
                    placeholder="Robert Pinto"
                    css={{ "--focus-color": "#3bc8f6d6" }}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </Field.Root>
              </Fieldset.Content>
            </Fieldset.Root>

            <Flex mt={3} w={"100%"} justifyContent={"space-between"}>
              <Button
                w={100}
                color={textColor}
                bg={"#3bc8f6d6"}
                border={"1px solid black"}
                onClick={() => {
                  navigate("/");
                }}
                fontSize={["xl", "xl", "1xl", "1xl", "1xl"]}
              >
                Back
              </Button>
              <Button
                w={100}
                color={textColor}
                bg={"#3bc8f6d6"}
                onClick={handleSubmit}
                border={"1px solid black"}
                fontSize={["xl", "xl", "1xl", "1xl", "1xl"]}
                disabled={
                  !email ||
                  !password ||
                  !confirmPassword ||
                  !displayName ||
                  passwordError ||
                  password !== confirmPassword
                }
              >
                Signup
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};
