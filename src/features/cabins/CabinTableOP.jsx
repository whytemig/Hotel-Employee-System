import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOP() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "discount", label: "discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "(A-Z)" },
          { value: "name-desc", label: "(Z-A)" },
          { value: "regularPrice-asc", label: "(low)" },
          { value: "regularPrice-desc", label: "(high)" },
          { value: "maxCapacity-asc", label: "(max)" },
          { value: "maxCapacity-desc", label: "(min)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOP;
