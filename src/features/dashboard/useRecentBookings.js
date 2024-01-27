import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays, format } from "date-fns";

export function useRecentBookings() {
  const [searchP] = useSearchParams();

  const numDays = !searchP.get("last") ? 10 : Number(searchP.get("last"));

  const queryDateUTC = subDays(new Date(), numDays);

  const queryDates = format(queryDateUTC, "yyyy-MM-dd HH:mm:ss.SSSxxx");

  console.log(queryDates);

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDates),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
}
