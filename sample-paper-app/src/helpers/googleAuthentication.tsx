import { useGoogleAuthentication } from "@/hooks/useGoogleAuthentication";
import { useNavigate } from "react-router-dom";

export const useGoogleAuthenticationHandler = () => {

    const navigate = useNavigate();
    const { googleAuth } = useGoogleAuthentication();
    
  const handleGoogleLogin = async () => {
    const googleLoginPromise = googleAuth();
    try {
      await googleLoginPromise;
      navigate("/filter-assignments");
    } catch (error: unknown) {
      console.log(error);
    }
  };
  return { handleGoogleLogin }
};
