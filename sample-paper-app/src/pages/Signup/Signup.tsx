import { Flex, Box, Input, Button, Text, Fieldset, Field } from "@chakra-ui/react"

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
          alignItems={"column"}
          w={["310px", "350px", "400px", "450px"]}
        >
          <form>
            <Fieldset.Root>
              <Fieldset.Content>
                <Field.Root>
                  <Field.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>EMAIL</Field.Label>
                  <Input
                    variant={"outline"}
                    placeholder="user@domain.com"
                    css={{ "--focus-color": "#3b82f6d6" }}
                    fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>PASSWORD</Field.Label>
                  <Input
                    type="password"
                    variant={"outline"}
                    placeholder="password >= 8"
                    css={{ "--focus-color": "#3b82f6d6" }}
                    fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>CONFIRM PASSWORD</Field.Label>
                  <Input
                    type="password"
                    variant={"outline"}
                    placeholder="password >= 8"
                    css={{ "--focus-color": "#3b82f6d6" }}
                    fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize={["l", "xl", "1xl", "1xl", "1xl"]}>DISPLAY NAME</Field.Label>
                  <Input
                    variant={"outline"}
                    placeholder="Robert Pinto"
                    css={{ "--focus-color": "#3b82f6d6" }}
                    fontSize={["l", "xl", "1xl", "1xl", "1xl"]}
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
                Signup
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Flex>
  )
}