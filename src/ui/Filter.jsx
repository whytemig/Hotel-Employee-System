/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

// making a FILTER COMPONENT TO BE REUSABLE
// eslint-disable-next-line react/prop-types
function Filter({ filterField, options }) {
  const [searchP, setSearchP] = useSearchParams();

  const currentFilterField = searchP.get(filterField) || options[0].value;

  function handleFilter(value) {
    searchP.set(filterField, value);
    if (searchP.get("page")) searchP.set("page", 1);
    setSearchP(searchP);
  }

  return (
    <StyledFilter>
      {options.map(({ value, label }, index) => (
        <FilterButton
          onClick={() => handleFilter(value)}
          key={index}
          active={value === currentFilterField}
          disabled={value === currentFilterField}
        >
          {label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
