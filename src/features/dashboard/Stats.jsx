import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

/* eslint-disable react/prop-types */
function Stats({ bookings, confirmStays, numDays, cabinCount }) {
  //1. number of bookings

  const numBookings = bookings.length;
  //2.total sales
  const sales = bookings?.reduce((acc, curr) => acc + curr.totalPrice, 0);

  //3. check-ins
  const checkIn = confirmStays.length;

  //4. occupance = nums of checkin / all availables
  let occupancy = confirmStays?.reduce((acc, curr) => acc + curr.numNights, 0);
  occupancy = occupancy / (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check-In"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIn}
      />
      <Stat
        title="Check-Out"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupancy * 100)}%`}
      />
    </>
  );
}

export default Stats;
