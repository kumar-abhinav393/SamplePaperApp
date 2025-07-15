import { useState } from "react";
import { useSignup } from "@/hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";
import { getPasswordIcon } from "@/helpers/getPasswordIcon";
import { Flex, Box, Input, Button, Text, Fieldset, Field, InputGroup } from "@chakra-ui/react";

export const Signup = () => {

  const { signup } = useSignup();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    const signupPromise = signup({ email, password, displayName })
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
        await signupPromise
        setEmail("")
        setPassword("")
        setDisplayName("")
        setConfirmPassword("")
        navigate("/login")
      }
    } catch (error: unknown) {
      console.log(error)
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
          alignItems={"column"}
          flexDirection={"column"}
          w={["310px", "350px", "400px", "450px"]}
        >
          <form>
            <Fieldset.Root>
              <Fieldset.Content>
                <Field.Root>
                  <Field.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>EMAIL</Field.Label>
                  <Input
                    value={email}
                    variant={"outline"}
                    placeholder="user@domain.com"
                    css={{ "--focus-color": "#3b82f6d6" }}
                    onChange={(e) => setEmail(e.target.value)}
                    fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>PASSWORD</Field.Label>
                  <InputGroup endElement={getPasswordIcon(showPassword, setShowPassword)}>
                    <Input
                      value={password}
                      variant={"outline"}
                      placeholder="password >= 8"
                      css={{ "--focus-color": "#3b82f6d6" }}
                      type={showPassword ? "text" : "password"}
                      fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>CONFIRM PASSWORD</Field.Label>
                  <InputGroup endElement={getPasswordIcon(showConfirmPassword, setShowConfirmPassword)}>
                    <Input
                      variant={"outline"}
                      value={confirmPassword}
                      placeholder="password >= 8"
                      fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
                      type={showConfirmPassword ? "text" : "password"}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      css={{ "--focus-color": (password === confirmPassword) ? "#3b82f6d6" : "red" }}
                    />
                  </InputGroup>
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>DISPLAY NAME</Field.Label>
                  <Input
                    variant={"outline"}
                    value={displayName}
                    placeholder="Robert Pinto"
                    css={{ "--focus-color": "#3b82f6d6" }}
                    fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </Field.Root>
              </Fieldset.Content>
            </Fieldset.Root>

            <Flex
              mt={4}
              w={"100%"}
              justifyContent={"space-between"}
            >
              <Button
                w={100}
                color={"white"}
                bg={"#3b82f6d6"}
                fontWeight={"bold"}
                onClick={() => { navigate("/") }}
                fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
              >
                Back
              </Button>
              <Button
                w={100}
                color={"white"}
                bg={"#3b82f6d6"}
                fontWeight={"bold"}
                onClick={handleSubmit}
                fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
                disabled={!email || !password || !confirmPassword || !displayName || password !== confirmPassword}
              >
                Signup
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  )
}