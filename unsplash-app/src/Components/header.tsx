import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getPhotosAction } from "../Store/photos";
import { SearchBar } from "./common";

interface HeaderHomeProps {
  onClickList: () => void;
}
export const HeaderHome = ({ onClickList }: HeaderHomeProps) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  return (
    <Header>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(getPhotosAction(search));
        }}
      >
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="type for search and hit enter"
        />
      </Form>

      <Button onClick={onClickList}>Lists</Button>
    </Header>
  );
};

interface HeaderDetailProps {
  onBack: () => void;
  title: string;
  details: number;
}
export const HeaderDetail: React.FC<HeaderDetailProps> = () => {
  return <Header>VIKAS</Header>;
};

const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex: 1;
`;

const Button = styled.button`
  height: 3.5rem;
  width: 10rem;
  border-radius: 0.3rem;
  border: none;
  outline: none;
  background-color: #2b2278;
  color: white;
  font-size: 1.5rem;
`;
