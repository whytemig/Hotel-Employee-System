/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckOut();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkOut(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
