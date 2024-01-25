import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: loginMutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      //this trick allow us to manually set data to the query cache
      queryClient.setQueryData(["user", user.user]);
      // console.log(data);
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      // console.log(err);
      toast.error("Credentials are incorrect");
    },
  });

  return { loginMutate, isLoading };
}
