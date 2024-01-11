import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Button onClick={() => setShowModal(() => !showModal)}>New Cabin</Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateCabinForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
