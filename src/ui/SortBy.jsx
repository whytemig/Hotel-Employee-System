/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import Select from "../ui/Select";

function SortBy({ options }) {
  const [searchP, setsearchP] = useSearchParams();

  const sortBy = searchP.get("sort") || "";

  function handleSelect(e) {
    searchP.set("sort", e.target.value);
    setsearchP(searchP);
  }

  return (
    <Select
      options={options}
      type="white"
      onClick={handleSelect}
      value={sortBy}
    />
  );
}

export default SortBy;
