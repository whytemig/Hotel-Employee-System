import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCabin } from "../../services/apiCabins";

function useUpdateCabinMutate() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editMutate } = useMutation({
    mutationFn: ({ newCabinData, id }) => addCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin Updated");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editMutate };
}

export default useUpdateCabinMutate;
