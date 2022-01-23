import { useState, useEffect } from "react";
import { FiX, FiEdit, FiTrash2, FiCheck, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  addListAction,
  createListAction,
  deleteListAction,
  editListAction,
  getListAction,
  selectListAction,
} from "../Store/lists";

export const ListingModal = () => {
  const list = useSelector(({ lists }: { lists: any }) => lists.list);

  const [editListOb, setEditList] = useState({ id: -1, name: "" });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListAction());
  }, [dispatch]);

  return (
    <>
      <CreateEditListComponent />

      {list.map((list: any) =>
        list.id === editListOb.id ? (
          <AddListComponent
            key={list.id + "anid"}
            value={editListOb.name}
            onAction={(text: string) => {
              dispatch(editListAction({ ...editListOb, name: text }));
              setEditList({ id: -1, name: "" });
            }}
            onClose={() => setEditList({ id: -1, name: "" })}
          />
        ) : (
          <ListItemComponent
            key={list.id + "anid"}
            list={list}
            onAction={(type) => {
              type === "edit"
                ? setEditList(list)
                : dispatch(deleteListAction(list.id));
            }}
          />
        )
      )}
    </>
  );
};

const ListItemComponent = ({
  list,
  onAction,
}: {
  list: any;
  onAction: (action: string) => void;
}) => {
  const activeListId = useSelector(
    ({ lists }: { lists: any }) => lists.activeListId
  );
  const dispatch = useDispatch();

  return (
    <ListItem
      key={list.name}
      style={{ backgroundColor: activeListId === list.id ? "#fff2" : "" }}
    >
      <ListItemText
        style={{
          cursor: "pointer",
        }}
        onClick={() => dispatch(selectListAction(list.id))}
      >
        {list.name} - {list.count || 0}
      </ListItemText>
      <div style={{ cursor: "pointer" }} onClick={() => onAction("edit")}>
        <FiEdit size="1.5rem" />
      </div>
      <div style={{ width: "1rem" }} />
      <div style={{ cursor: "pointer" }} onClick={() => onAction("delete")}>
        <FiTrash2 size="1.5rem" />
      </div>
    </ListItem>
  );
};

const AddListComponent = ({
  value,
  onAction,
  onClose,
}: {
  value: string;
  onAction: (s: string) => void;
  onClose?: () => void;
}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <ListItem>
      <div style={{ display: "flex", flex: 1 }}>
        <EditText
          placeholder="Enter your list name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div style={{ width: "1rem" }} />
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (text.length > 0) {
            setText("");
            onAction(text);
          }
        }}
      >
        <FiCheck size="1.5rem" />
      </div>

      {onClose && (
        <>
          <div style={{ width: "1rem" }} />
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setText("");
              onClose();
            }}
          >
            <FiX size="1.5rem" />
          </div>
        </>
      )}
    </ListItem>
  );
};

const CreateEditListComponent = () => {
  const show = useSelector(({ lists }: { lists: any }) => lists.addListItem);

  const dispatch = useDispatch();

  return (
    <>
      <ListItem>
        <ListItemText>Create New List</ListItemText>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(addListAction(!show))}
        >
          {!show ? <FiPlus size="1.5rem" /> : <FiX size="1.5rem" />}
        </div>
      </ListItem>
      {show && (
        <AddListComponent
          value={""}
          onAction={(text: string) => {
            dispatch(createListAction(text));
          }}
        />
      )}
    </>
  );
};

const EditText = styled.input`
  padding: 8px;
  background-color: #fff3;
  outline: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  width: 100%;
  border-radius: 0.3rem;

  &::placeholder {
    color: #fff9;
  }
`;

const ListItem = styled.div`
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #fff3;
`;

const ListItemText = styled.div`
  font-size: 1.2rem;
  flex: 1;
`;
