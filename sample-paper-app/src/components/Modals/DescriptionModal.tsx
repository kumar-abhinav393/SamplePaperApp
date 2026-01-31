import {
  Button,
  createOverlay,
  Dialog,
  Field,
  Flex,
  Portal,
  Textarea,
} from "@chakra-ui/react";
import type React from "react";
import { useColorModeValue } from "../ui/color-mode";
import { useState } from "react";

interface DialogProps {
  title?: string;
  description?: string;
  content?: React.ReactNode;
}

export const dialog = createOverlay<DialogProps>((props) => {
  const { title, description, ...rest } = props;

  const [text, setText] = useState(description || "");
  
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
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
            )}
            <Dialog.Body bg={{ base: "#f5f5f5ff", _dark: "#141218" }}>
              {description && (
                <Dialog.Description color={textColor}>
                  <Flex mt={2} gap={2}>
                    <Field.Root required>
                      <Textarea
                        size={"xl"}
                        value={text}
                        maxLength={500}
                        variant={"outline"}
                        autoresize maxH={"10lh"}
                        placeholder="start typing..."
                        css={{ "--focus-color": "#3bc8f6d6" }}
                        onChange={(e) => setText(e.target.value)}
                      />
                      <Field.ErrorText>Field is required</Field.ErrorText>
                      <Field.HelperText>Max 500 characters.</Field.HelperText>
                    </Field.Root>
                  </Flex>
                  <Flex alignItems={"center"} justifyContent={"center"} mt={10}>
                    <Button
                      color={textColor}
                      bg={"#3bc8f6d6"}
                      disabled={!text}
                      border={"1px solid black"}
                      fontSize={["xl", "xl", "xl", "1xl", "1xl"]}
                      onClick={() => dialog.close("a", text)}
                    >
                      {title?.includes("Edit") ? "Update" : "Add"}
                    </Button>
                  </Flex>
                </Dialog.Description>
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});
