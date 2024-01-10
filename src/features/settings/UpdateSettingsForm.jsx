import Form from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { settingsData, isLoading } = useSettings();
  const { updateMutate, isUpdating } = useUpdateSettings();

  const { minBooking, maxBooking, maxGuest, breakfastPrice } =
    settingsData || {};

  function handleUpdate(e, inputName) {
    const { value } = e.target;
    // console.log(value);

    if (!value) return;
    updateMutate({ ...settingsData, [inputName]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBooking")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBooking")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuest}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuest")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
