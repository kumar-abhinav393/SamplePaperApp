import { Box, Button, Flex, Input, Portal, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateModal = ({ isOpen, onClose }: UpdateModalProps) => {
  const textColor = useColorModeValue("black", "white");

  return (
    <Portal>
      <Box
        top={0}
        left={0}
        w={"100%"}
        h={"100%"}
        display={"flex"}
        position={"fixed"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          maxW={"400px"}
          display={"flex"}
          boxShadow={"lg"}
          borderRadius={"md"}
          alignItems={"center"}
          flexDirection={"column"}
          justifyContent={"center"}
          border={"1px solid #444746"}
          bg={{ base: "#f5f5f5ff", _dark: "#141218" }}
        >
          <Text
            p={3}
            mt={3}
            color={textColor}
            fontWeight={"bold"}
            fontSize={["sm", "sm", "md", "lg", "lg"]}
          >
            EDIT ASSIGNMENT
          </Text>
          <Box display="flex" justifyContent="center" w="100%" mb={3} p={"3"}>
            <Box h="1px" bg="#444746" w="100%" borderRadius="1px" />
          </Box>
          <Box
            p={3}
            gap={4}
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
          >
            <Flex
              alignItems={"center"}
              gap={[5, 5, 5, 10, 10]}
            >
              <Text
                w={"70px"}
                color={textColor}
                whiteSpace={"nowrap"}
                fontSize={["sm", "sm", "md", "lg", "lg"]}
              >
                Topic
              </Text>
              <Input
                size={"sm"}
                css={{ "--focus-color": "#3bc8f6d6" }}
                w={["200px", "200px", "230px", "230px", "230px"]}
              />
            </Flex>
            <Flex
              alignItems={"center"}
              gap={[5, 5, 5, 10, 10]}
            >
              <Text
                w={"70px"}
                color={textColor}
                whiteSpace={"nowrap"}
                fontSize={["sm", "sm", "md", "lg", "lg"]}
              >
                Subject
              </Text>
              <Input
                size={"sm"}
                css={{ "--focus-color": "#3bc8f6d6" }}
                w={["200px", "200px", "230px", "230px", "230px"]}
              />
            </Flex>
            <Flex
              alignItems={"center"}
              gap={[5, 5, 5, 10, 10]}
            >
              <Text
                w={"70px"}
                color={textColor}
                whiteSpace={"nowrap"}
                fontSize={["sm", "sm", "md", "lg", "lg"]}
              >
                Faculty
              </Text>
              <Input
                size={"sm"}
                css={{ "--focus-color": "#3bc8f6d6" }}
                w={["200px", "200px", "230px", "230px", "230px"]}
              />
            </Flex>
            <Flex
              alignItems={"center"}
              gap={[5, 5, 5, 10, 10]}
            >
              <Text
                w={"70px"}
                color={textColor}
                whiteSpace={"nowrap"}
                fontSize={["sm", "sm", "md", "lg", "lg"]}
              >
                DOR
              </Text>
              <Input
                size={"sm"}
                css={{ "--focus-color": "#3bc8f6d6" }}
                w={["200px", "200px", "230px", "230px", "230px"]}
              />
            </Flex>
          </Box>
          <Box display="flex" justifyContent="center" w="100%" mt={3} p={"3"}>
            <Box h="1px" bg="#444746" w="100%" borderRadius="1px" />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Text
              m={3}
              color={textColor}
              fontWeight={"bold"}
              fontSize={["sm", "sm", "md", "lg", "lg"]}
            >
              Need to update this Assignment?
            </Text>
          </Box>
          <Flex
            p={3}
            w={"100%"}
            justifyContent={"space-between"}
          >
            <Button
              color={textColor}
              bg={"#3bc8f6d6"}
              fontWeight={"bold"}
              border={"1px solid black"}
              size={["sm", "sm", "md", "lg", "lg"]}
              fontSize={["sm", "sm", "md", "lg", "lg"]}
            >
              Cancel
            </Button>
            <Button
              color={textColor}
              bg={"#3bc8f6d6"}
              fontWeight={"bold"}
              border={"1px solid black"}
              size={["sm", "sm", "md", "lg", "lg"]}
              fontSize={["sm", "sm", "md", "lg", "lg"]}
            >
              Update
            </Button>
          </Flex>
        </Box>
      </Box>
    </Portal>
  )
}