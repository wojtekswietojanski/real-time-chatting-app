import "../styling/searchBar/searchBar.css";
import { useState } from "react";

const SearchBar = ({ setSearchUsers }) => {
  const [filterValue, setFilterValue] = useState("");

  return (
    <form
      action=""
      id="searchBarForm"
      onSubmit={(event) => {
        event.preventDefault();
        setSearchUsers(filterValue);
        setFilterValue("");
      }}
    >
      <input
        type="text"
        placeholder="🔍 Search"
        id="searchBarInput"
        value={filterValue}
        onChange={(event) => {
          setFilterValue(event.target.value);
        }}
      />
    </form>
  );
};

export default SearchBar;
