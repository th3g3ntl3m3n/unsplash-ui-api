import { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchBar } from "../Components/common";
import { getPhotosAction } from "../Store/photos";
import { ListingModal } from "./ListContainer";

export const SidebarContainer = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  return (
    <div style={{ margin: "2rem" }}>
      <form
        style={{ display: "flex", flex: 1 }}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(getPhotosAction(search));
        }}
      >
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type for search and hit enter"
        />
      </form>
      <div style={{ height: 48 }} />
      <ListingModal />
    </div>
  );
};
