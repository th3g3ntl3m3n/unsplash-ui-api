import { useState, useEffect } from "react";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AddRemovePhotoLinkApi, GetSelectedList } from "../api";
import { ListItem, ListItemText } from "../Components/common";
import { ListModal } from "../Components/list";
import { getListAction, updateListCount } from "../Store/lists";

export const ListingModalSelect = ({
  url,
  onClose,
}: {
  url: any;
  onClose: () => void;
}) => {
  const list = useSelector(({ lists }: { lists: any }) => lists.list);
  const [selected, setSelected] = useState({} as any);
  const dispatch = useDispatch();
  const addPhotoLink = (listId: number) => {
    let v = !selected[listId];
    AddRemovePhotoLinkApi(listId, v, url).then((data) => {
      setSelected({ ...selected, [listId]: v });
      dispatch(updateListCount(v ? 1 : -1, listId));
    });
  };

  useEffect(() => {
    dispatch(getListAction());
    GetSelectedList(url.id).then((data) => setSelected({ ...data }));
  }, [dispatch, url.id]);

  return (
    <ListModal onClose={onClose}>
      {list.map((list: any) => (
        <ListItemComponent
          list={list}
          key={list.id}
          checked={selected[list.id]}
          onAction={() => addPhotoLink(list.id)}
        />
      ))}
    </ListModal>
  );
};

const ListItemComponent = ({
  list,
  checked,
  onAction,
}: {
  list: any;
  checked: boolean;
  onAction: () => void;
}) => {
  return (
    <ListItem
      style={{ cursor: "pointer" }}
      key={list.name}
      onClick={() => onAction()}
    >
      <ListItemText>{list.name}</ListItemText>
      {checked ? <FiCheckSquare size="1.5rem" /> : <FiSquare size="1.5rem" />}
    </ListItem>
  );
};
