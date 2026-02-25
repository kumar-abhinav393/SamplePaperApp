import {
  createOverlay,
  Dialog,
  Field,
  Flex,
  Portal,
  Textarea,
} from "@chakra-ui/react";
import type React from "react";
import { useColorModeValue } from "../ui/color-mode";
import { useEffect, useState } from "react";
import { RippleButton } from "../ui/RippleButton";

interface DialogProps {
  title?: string;
  content?: React.ReactNode;
  initialValue?: string;
}

export const dialog = createOverlay<DialogProps>((props) => {
  const { title, initialValue, ...rest } = props;

  const [text, setText] = useState("");
  const isOpen = (rest as { open?: boolean }).open;

  const textColor = useColorModeValue("black", "white");

  useEffect(() => {
    if (isOpen) {
      setText(initialValue ?? "");
    }
  }, [initialValue, isOpen]);

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
                  <RippleButton
                    color={textColor}
                    bg={"#3bc8f6d6"}
                    disabled={!text}
                    border={"1px solid black"}
                    onClick={() => dialog.close("a", text)}
                    fontSize={["sm", "sm", "md", "lg", "lg"]}
                    h={["30px", "30px", "30px", "40px", "40px"]}
                    w={["80px", "80px", "100px", "120px", "120px"]}
                  >
                    {title?.includes("Edit") ? "Update" : "Add"}
                  </RippleButton>
                </Flex>
              </Dialog.Description>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});
