import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: loginMutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: () => {
      // console.log(data);
      navigate("/dashboard");
    },
    onError: () => {
      // console.log(err);
      toast.error("Credentials are incorrect");
    },
  });

  return { loginMutate, isLoading };
}
