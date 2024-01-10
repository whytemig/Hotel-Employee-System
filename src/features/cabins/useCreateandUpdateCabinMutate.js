import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCabin } from "../../services/apiCabins";

function useCreateandUpdateCabinMutate() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (newCabinData) => addCabin(newCabinData),
    onSuccess: () => {
      toast.success("Cabin successfully Created");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isLoading, mutate };
}

export default useCreateandUpdateCabinMutate;
