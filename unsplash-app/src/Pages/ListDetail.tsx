import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AddRemovePhotoLinkApi } from "../api";
import { GridContainer } from "../Components/common";
import { HeaderDetail } from "../Components/header";
import { ImageComponent } from "../Components/image";
import { FetchApi } from "../utils";

interface DetailState {
  id: number;
  name: string;
}

export const ListDetailPage = () => {
  const [urls, setUrls] = useState([]);
  let loc = useLocation();
  let state = loc.state as DetailState;

  const navigation = useNavigate();

  useEffect(() => {
    FetchApi(`/api/lists/photos?id=${state.id}`).then((data) => setUrls(data));
  }, [state]);

  return (
    <>
      <HeaderDetail
        onBack={() => navigation("/")}
        title={state.name}
        details={urls.length}
      />
      <GridContainer>
        {urls.map((url: any) => (
          <ImageComponent
            key={url.id}
            url={url}
            buttonText={"Delete"}
            onAction={() => {
              // AddRemovePhotoLinkApi(state.id, false, url).then((data) => {
              //   setUrls(urls.filter((u: any) => u.id !== url.id));
              // });
            }}
          />
        ))}
      </GridContainer>
    </>
  );
};

/**
 * 
 * 
 *  <Header>
        <div style={{ cursor: "pointer" }} onClick={() => navigation("/")}>
          <FiArrowLeft size="2rem" />
        </div>
        <h1>{state.name}</h1>
        <ChipContainer>{urls.length}</ChipContainer>
      </Header>
 */

const ChipContainer = styled.div`
  width: 80px;
  height: 32px;
  border-radius: 20px;
  color: white;
  background-color: #fff6;
  font-weight: 700;

  display: grid;
  place-items: center;
  font-size: 1.2rem;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 80px;
  grid-gap: 1rem;
  align-self: end;
  place-items: center start;
  margin-bottom: 2rem;
  color: white;
`;
