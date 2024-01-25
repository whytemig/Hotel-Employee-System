import { useQuery } from "@tanstack/react-query";
import { getLoginUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getLoginUser,
  });

  return { isLoading, user, isAuth: user?.role === "authenticated" };
}
