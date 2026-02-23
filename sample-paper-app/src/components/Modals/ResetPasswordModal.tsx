import {
  createOverlay,
  Dialog,
  Flex,
  Input,
  Portal,
} from "@chakra-ui/react";
import type React from "react";
import { GiClick } from "react-icons/gi";
import { toaster } from "../ui/toaster";
import { useResetPassword } from "@/hooks/useResetPassword";
import { useState } from "react";
import { useColorModeValue } from "../ui/color-mode";
import { RippleButton } from "../ui/RippleButton";

interface DialoagProps {
  title?: string;
  description?: string;
  content?: React.ReactNode;
}

export const dialog = createOverlay<DialoagProps>((props) => {
  const { title, description, content, ...rest } = props;

  const { resetPassword } = useResetPassword();
  const textColor = useColorModeValue("black", "white")

  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    try {
      await resetPassword(email);
      toaster.create({
        description: "Please check the mail to reset your password in your inbox or spam",
        type: "info",
        closable: true,
      });
      dialog.close("a");
    } catch {
      toaster.create({
        description: "Invalid Email Address",
        type: "error",
        closable: true,
      });
    }
  };

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
                <Dialog.Title fontSize={"md"}>
                  {title}
                </Dialog.Title>
              </Dialog.Header>
            )}
            <Dialog.Body bg={{ base: "#f5f5f5ff", _dark: "#141218" }}>
              {description && (
                <Dialog.Description
                  color={textColor}
                >
                  {description}
                  <Flex mt={2} gap={2}>
                    <Input
                      value={email}
                      variant={"outline"}
                      placeholder="abc@domain.com"
                      css={{ "--focus-color": "#3bc8f6d6" }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <RippleButton
                      color={textColor}
                      bg={"#3bc8f6d6"}
                      disabled={!email}
                      border={"1px solid black"}
                      onClick={handleResetPassword}
                      fontSize={["xl", "xl", "xl", "1xl", "1xl"]}
                    >
                      {<GiClick />}
                    </RippleButton>
                  </Flex>
                </Dialog.Description>
              )}
              {content}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});
