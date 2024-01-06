import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Cabins</Heading>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShow(() => !show)}>New Cabin</Button>
        {show && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
