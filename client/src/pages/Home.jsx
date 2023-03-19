import React from "react";
import styled from "styled-components";
import VideoCard from "../components/VideoCard.jsx";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
function Home(props) {
  return (
    <Container>
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
      <VideoCard />
    </Container>
  );
}

export default Home;
