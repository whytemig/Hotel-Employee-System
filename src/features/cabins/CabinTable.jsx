// import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import AnotherTable from "../../ui/Table";
import Menus from "../../ui/Menus";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  //THIS CAN BE A CUSTOM HOOK AS WELL BUT ITS SMALL AND I LEFT THIS FOR REFERENCE FOR ANYONE WHO IS LOOKING AT MY CODE.
  const {
    isLoading,
    data: cabinData,
    error,
  } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });

  if (isLoading) return <Spinner />;

  if (error) {
    console.log(error.message);
  }

  return (
    <Menus>
      <AnotherTable columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <AnotherTable.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </AnotherTable.Header>
        <AnotherTable.Body
          data={cabinData}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </AnotherTable>
    </Menus>
  );
}

export default CabinTable;
