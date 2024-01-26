import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser } from "../../services/apiAuth";

function useUpdate() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUserMutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: ({ user }) => {
      toast.success("User updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUserMutate };
}

export default useUpdate;
