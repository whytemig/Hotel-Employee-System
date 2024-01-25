import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signupMutate, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      // console.log(user);
      toast.success("Account created. Verify email please");
    },
  });

  return { signupMutate, isLoading };
}
