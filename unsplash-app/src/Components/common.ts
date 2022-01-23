import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display:grid;
  grid-template-columns: 1fr 400px;
  background-color: ${props => props.theme.page};
  color:white;
`;

// grid-template-columns: 300px 300px 300px 300px;
export const GridContainer = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 250px;
  overflow-y: scroll;
  margin: 2rem;
`;

export const Modal = styled.div`
  position: absolute;
  display: grid;
  place-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const ListItem = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #fff3;
`;

export const ListItemText = styled.div`
  font-size: 1.2rem;
  flex: 1;
`;

export const SearchBar = styled.input`
  background-color: #fff3;
  font-size: 1rem;
  height: 2.5rem;
  border: none;
  outline: none;
  display:flex;
  flex:1;
  color: white;
  border-radius: 0.3rem;
  padding-left: 10px;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.3);
  &::placeholder {
    color: #fff9;
  }
`;