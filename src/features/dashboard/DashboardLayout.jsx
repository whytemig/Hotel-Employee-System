import styled from "styled-components";
import { useRecentBookings } from "../../features/dashboard/useRecentBookings";
import { useRecentStays } from "../../features/dashboard/useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { data: cabinData } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });
  const { bookings, isLoading } = useRecentBookings();
  const { isLoading: isStaying, confirmStays, numDays } = useRecentStays();

  if (isLoading || isStaying) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmStays={confirmStays}
        numDays={numDays}
        cabinCount={cabinData.length}
      />
      <div>Todays</div>
      <div>Chart for stay</div>
      <div>Chart for sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
