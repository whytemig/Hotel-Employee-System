/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers.js";
import CreateCabinForm from "./CreateCabinForm.jsx";
import { useCabinMutate } from "./useCabinMutate.js";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateandUpdateCabinMutate from "./useCreateandUpdateCabinMutate.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import AnotherTable from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  // const [showForm, setShowForm] = useState(false);
  const { id, name, maxCapacity, regularPrice, image, discount, description } =
    cabin;

  // function below is a custom hook.
  //this hook is for deleting, I forgot which tab i was in and made a Hook for deleting instead of creating but the function works.
  //Apologises for the mistake
  const { isLoading: isDeleting, mutate: deleteCabin } = useCabinMutate();
  const { mutate: createMutate } = useCreateandUpdateCabinMutate();

  function duplicateCabin() {
    createMutate({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      image,
      discount,
      description,
    });
  }

  return (
    <AnotherTable.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Maximun: {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <div>
        {/* <button onClick={duplicateCabin} disabled={isCreating}>
          <HiSquare2Stack />
        </button> */}
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={duplicateCabin}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button disabled={isDeleting} icon={<HiTrash />}>
                  Delete
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm editCabin={cabin} />
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(id)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>

        {/* <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={duplicateCabin}>
              Duplicate
            </Menus.Button>
            <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Menus.List>
        </Menus.Menu> */}
      </div>
    </AnotherTable.Row>
  );
};

export default CabinRow;
