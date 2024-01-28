import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays, format } from "date-fns";

export function useRecentStays() {
  const [searchP] = useSearchParams();

  const numDays = !searchP.get("last") ? 10 : Number(searchP.get("last"));

  const queryDateUTC = subDays(new Date(), numDays);

  const queryDates = format(queryDateUTC, "yyyy-MM-dd HH:mm:ss.SSSxxx");

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDates),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isLoading, stays, confirmStays, numDays };
}
