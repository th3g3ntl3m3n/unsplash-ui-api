import { useState } from "react";
import { ListingModal } from "../Containers/ListContainer";
import { ListingModalSelect } from "../Containers/ListContainerSelect";
import { PhotoSearchComponent } from "../Containers/SearchContainer";
import { SidebarContainer } from "../Containers/SideBar";

export const HomePage = () => {
  const [show, setShow] = useState(false);
  const [selectedImg, setSelectedImage] = useState(null);

  return (
    <>
      <PhotoSearchComponent
        onClickList={() => setShow(true)}
        onClickPhoto={(url: any) => setSelectedImage(url)}
      />

      <SidebarContainer />
      {selectedImg && (
        <ListingModalSelect
          url={selectedImg}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};
