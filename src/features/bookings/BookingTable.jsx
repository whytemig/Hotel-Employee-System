import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Pagination, { PAGE_SIZE } from "../../ui/Pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function BookingTable() {
  const [searchP] = useSearchParams();
  const queryClient = useQueryClient();

  //FILTER****************************************************
  const filteredValue = searchP.get("status");

  const filter =
    !filteredValue || filteredValue === "all"
      ? null
      : { field: "status", value: filteredValue };

  //sortby*******************************************************
  const sortByData = searchP.get("sort") || "startDate-desc";

  const [field, direction] = sortByData.split("-");
  const sortBy = { field, direction };

  //PAGINATION*****************************************************

  const page = !searchP.get("page") ? 1 : Number(searchP.get("page"));

  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PREFETCHING******************************************************

  const pageCount = Math.ceil(bookings?.count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  } else if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  if (isLoading) return <Spinner />;

  if (!bookings?.data.length) return <Empty resource="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings?.data}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={bookings?.count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
