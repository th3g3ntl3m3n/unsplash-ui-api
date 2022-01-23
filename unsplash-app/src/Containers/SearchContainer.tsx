import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PhotoGridComponent } from "../Components/photoGrid";
import { getPhotosAction } from "../Store/photos";

export const PhotoSearchComponent = ({
  onClickList,
  onClickPhoto,
}: {
  onClickList: () => void;
  onClickPhoto: (url: any) => void;
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhotosAction(""));
  }, [dispatch]);

  return <PhotoGridComponent onAction={(url) => onClickPhoto(url)} />;
};
