import { FiPlusCircle, FiThumbsUp, FiTrash2 } from "react-icons/fi";
import styled from "styled-components";

export const ImageComponent = ({
  url,
  buttonText,
  onAction,
}: {
  url: any;
  buttonText: string;
  onAction: () => void;
}) => {
  return (
    <div style={{ position: "relative" }}>
      <ImageOverlay>
        <div>
          <FiThumbsUp />
          {` ${url.likes || 0}`}
        </div>
        <div style={{ cursor: "pointer" }} onClick={onAction}>
          {buttonText === "save" ? (
            <FiPlusCircle size="1.2rem" />
          ) : (
            <FiTrash2 size="1.2rem" />
          )}
        </div>
      </ImageOverlay>
      <Image key={url.id} alt={url.id} src={url.url} />
    </div>
  );
};

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  padding: 10px;
  font-size: 1.2rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0006;
  z-index: 100;
  color: white;
`;

const Image = styled.img`
  height: 250px;
  width: 100%;
  object-fit: cover;
  z-index: 9;
`;
