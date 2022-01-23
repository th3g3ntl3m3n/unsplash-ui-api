import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AddRemovePhotoLinkApi } from "../api";
import {
  addListAction,
  selectListAction,
  updateListCount,
} from "../Store/lists";
import { PhotoUrl } from "../types";
import { GridContainer } from "./common";
import { ImageComponent } from "./image";

interface PhotoGridProps {
  onAction: (url: PhotoUrl) => void;
}

export const PhotoGridComponent = ({ onAction }: PhotoGridProps) => {
  const { activeListId, photos, isListEmpty } = useSelector(
    ({ lists, photos }: { lists: any; photos: any }) => ({
      photos: photos.photos,
      activeListId: lists.activeListId,
      isListEmpty: lists.list.length === 0,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  return (
    <GridContainer>
      {photos.map((url: PhotoUrl) => (
        <ImageComponent
          key={url.id}
          url={url}
          buttonText={activeListId > 0 ? "delete" : "save"}
          onAction={async () => {
            if (activeListId > 0) {
              await AddRemovePhotoLinkApi(activeListId, false, url);
              dispatch(selectListAction(activeListId));
              dispatch(updateListCount(-1, activeListId));
            } else {
              if (isListEmpty) {
                dispatch(addListAction(true));
                return;
              }
              onAction(url);
            }
          }}
        />
      ))}
    </GridContainer>
  );
};
