import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setaddBreakfast] = useState(false);
  const { bookingData: booking, isLoading } = useBooking();
  const { settingsData } = useSettings();
  const moveBack = useMoveBack();

  const { checkIn, isCheckingIn, isLoading: isSetting } = useCheckIn();

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking || {};

  useEffect(() => {
    setConfirmPaid(isPaid ?? false);
  }, [isPaid]);

  const optionalBreakfast =
    settingsData?.breakfastPrice * numNights * numGuests;

  if (isLoading || isSetting) return <Spinner />;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: optionalBreakfast,
          totalPrice: totalPrice + optionalBreakfast,
        },
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setaddBreakfast((add) => !add), setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Add Breakfast for {formatCurrency(optionalBreakfast)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((comfirm) => !comfirm)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfast
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfast
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
