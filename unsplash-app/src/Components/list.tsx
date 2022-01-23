import { FiX } from "react-icons/fi";
import styled from "styled-components";
import { Modal } from "./common";

export const ListModal = ({
  onClose,
  children,
}: {
  onClose: any;
  children: any;
}) => {
  return (
    <Modal>
      <ListContainer>
        <ListHeader>
          <ListHeaderText>Lists</ListHeaderText>
          <div style={{ cursor: "pointer" }} onClick={onClose}>
            <FiX size="1.5rem" />
          </div>
        </ListHeader>
        <div style={{ overflowY: "scroll", height: "100%" }}>{children}</div>
      </ListContainer>
    </Modal>
  );
};

const ListContainer = styled.div`
  width: 28rem;
  height: 35rem;
  background-color: ${(props) => props.theme.page};
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.4);
  color: ${(props) => props.theme.font};
  border-radius: 5px;
`;

const ListHeader = styled.div`
  padding: 0px;
  margin: 0px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid white;
`;

const ListHeaderText = styled.h3`
  padding: 0px;
  margin: 0px;
`;
