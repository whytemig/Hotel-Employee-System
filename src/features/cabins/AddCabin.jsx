import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

//COMPOUND COMPONENT
function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [showModal, setShowModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setShowModal(() => !showModal)}>New Cabin</Button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <CreateCabinForm onClose={() => setShowModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
