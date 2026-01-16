import { Box, Button, createOverlay, Dialog, Flex, Portal, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import type { AssignmentProps } from "@/types/types";

interface DialogProps {
  title?: string;
  description?: string;
  content?: AssignmentProps;
}

export const dialog = createOverlay<DialogProps>((props) => {
  const { title, ...rest } = props;

  const textColor = useColorModeValue("black", "white");
  return (
    <Dialog.Root {...rest}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner justifyContent={"center"} alignItems={"center"}>
          <Dialog.Content>
            {title && (
              <Dialog.Header
                color={textColor}
                alignItems={"center"}
                justifyContent={"center"}
                bg={{ base: "#f5f5f5ff", _dark: "#141218" }}
              >
                <Dialog.Title fontSize={"md"}>{title}</Dialog.Title>
              </Dialog.Header>
            )}
            <Dialog.Body bg={{ base: "#f5f5f5ff", _dark: "#141218" }}>
                <Box display={"flex"} justifyContent={"center"}>
                  <Box h={"1px"} bg="#444746" w={"99%"} borderRadius={"1px"}/>
                </Box>
                <Box
                  p={5}
                  gap={3}
                  display={"flex"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                >
                  <Box>
                    {props.content?.props.topicName}
                  </Box>
                  <Box>
                    {props.content?.props.subjectCode}
                  </Box>
                  <Box>
                    {props.content?.props.createdBy}
                  </Box>
                </Box>
                <Box display={"flex"} justifyContent={"center"}>
                  <Box h={"1px"} bg="#444746" w={"99%"} borderRadius={"1px"}/>
                </Box>
                <Box p={5} display={"flex"} justifyContent={"center"}>
                  <Text fontSize={"md"}>Are you sure you want to delete the {props.content?.props.code}?</Text>
                </Box>
                <Box p={5} display={"flex"} justifyContent={"space-between"}>
                  <Flex>
                    <Button
                      color={textColor}
                      bg={"#3bc8f6d6"}
                      border={ "1px solid black"}
                      fontSize={["xl", "xl", "1xl", "1xl", "1xl"]}
                    >
                      Cancel
                    </Button>
                  </Flex>
                  <Flex>
                    <Button
                      color={textColor}
                      bg={"#3bc8f6d6"}
                      border={ "1px solid black"}
                      fontSize={["xl", "xl", "1xl", "1xl", "1xl"]}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Box>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});
