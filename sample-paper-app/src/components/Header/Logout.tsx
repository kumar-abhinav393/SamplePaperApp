import { useSignout } from "@/hooks/useSignout";
import { Flex } from "@chakra-ui/react";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toaster } from "../ui/toaster";

export const Logout = () => {
  const navigate = useNavigate();
  const { signout } = useSignout();

  const handleLogout = async () => {
    try {
      await signout();
      navigate("/");
    } catch {
      toaster.create({
        type: "error",
        title: "Logout failed",
        description: "Try after some time.",
      });
    }
  };

  return (
    <div>
      <Flex
        width={["5", "5", "5", "6", "6"]}
        _hover={{ color: "#3b82f6d6" }}
        cursor={"pointer"}
        onClick={handleLogout}
      >
        <IoMdLogOut size={"md"} />
      </Flex>
    </div>
  );
};
