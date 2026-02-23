import { useEffect, useRef, useState } from "react";
import { useSignup } from "@/hooks/useSignup";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { FcGoogle } from "react-icons/fc";
import { useGoogleAuthenticationHandler } from "@/helpers/googleAuthentication";
import { validateInviteToken } from "@/helpers/validateInviteToken";
import { RippleButton } from "@/components/ui/RippleButton";

export const Signup = () => {
  const { signup } = useSignup();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const textColor = useColorModeValue("black", "white");
  const { handleGoogleLogin } = useGoogleAuthenticationHandler();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inviteToken = searchParams.get("invite");
  const hasShownToastRef = useRef(false);

  useEffect(() => {
    const checkInvite = async () => {
      if (!inviteToken || hasShownToastRef.current) return;
      try{
        hasShownToastRef.current = true;
        await validateInviteToken(inviteToken);
        localStorage.setItem("inviteToken", inviteToken)
      } catch (error) {
        toaster.create({
          title: "Invalid Invite Token",
          description: (error as Error).message,
          type: "error",
        });

        navigate("/login");
      }
    };
    checkInvite();
  }, [inviteToken, navigate]);

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
      setIsSigningUp(true);
      await signupPromise;
      navigate("/login");
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setIsSigningUp(false);
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
      <Text fontWeight={"bold"} fontSize={["2xl", "2xl", "3xl", "3xl", "3xl"]}>
        Create Account
      </Text>
      <Flex
        gap={2}
        alignItems={"center"}
      >
        <Text>Already Registered?</Text>
        <Box onClick={() => navigate("/login")}>
          <Text cursor={"pointer"} fontWeight={"bold"} color={"#3bc8f6d6"}>
            Login
          </Text>
        </Box>
      </Flex>
      <Flex pt={5}>
        <Button
          color={textColor}
          bg={"#3bc8f6d6"}
          onClick={handleGoogleLogin}
          border={"1px solid black"}
          w={["310px", "350px", "400px", "450px"]}
          fontSize={["xs", "xs", "sm", "md", "md"]}
          h={["30px", "30px", "30px", "40px", "40px"]}
        >
          <FcGoogle />
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
        mt={3}
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

          <Flex mt={3} justifyContent={"space-between"}>
            <RippleButton
              color={textColor}
              bg={"#3bc8f6d6"}
              border={"1px solid black"}
              onClick={() => { navigate("/");}}
              fontSize={["sm", "sm", "md", "lg", "lg"]}
              h={["30px", "30px", "30px", "40px", "40px"]}
              w={["80px", "80px", "100px", "120px", "120px"]}
            >
              Back
            </RippleButton>
            <RippleButton
              color={textColor}
              bg={"#3bc8f6d6"}
              loading={isSigningUp}
              onClick={handleSubmit}
              border={"1px solid black"}
              fontSize={["sm", "sm", "md", "lg", "lg"]}
              h={["30px", "30px", "30px", "40px", "40px"]}
              w={["80px", "80px", "100px", "120px", "120px"]}
              disabled={!email || !password || !displayName || passwordError}
            >
              Signup
            </RippleButton>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};
