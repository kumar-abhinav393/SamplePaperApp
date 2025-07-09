import { useSignup } from "@/hooks/useSignup";
import { Flex, Box, Input, Button, Text, Fieldset, Field } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const Signup = () => {

  const { signup } = useSignup();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if(password === confirmPassword) {
        await signup({ email, password, displayName })
      }
    } catch (error: unknown) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    navigate("/")
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
          flexDirection={"column"}
          alignItems={"column"}
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
                  <Input
                    type="password"
                    value={password}
                    variant={"outline"}
                    placeholder="password >= 8"
                    css={{ "--focus-color": "#3b82f6d6" }}
                    fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>CONFIRM PASSWORD</Field.Label>
                  <Input
                    type="password"
                    variant={"outline"}
                    value={confirmPassword}
                    placeholder="password >= 8"
                    css={{ "--focus-color": (password === confirmPassword) ? "#3b82f6d6" : "red" }}
                    fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
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
                onClick={handleCancel}
                fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
              >
                Back
              </Button>
              <Button
                w={100}
                disabled={!email || !password || !confirmPassword || !displayName || password !== confirmPassword}
                color={"white"}
                bg={"#3b82f6d6"}
                fontWeight={"bold"}
                onClick={handleSubmit}
                fontSize={["xl", "xl", "1xl", "2xl", "2xl"]}
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