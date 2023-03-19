import React from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined.js";
import { SearchOutlined } from "@mui/icons-material";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bg};
  height: 3.5rem;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 3rem;
  justify-content: flex-end;
  position: relative;
`;
const Search = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
`;
const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  width: 100%;
`;
const Button = styled.button`
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 0.3rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
function Navbar() {
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" />
          <SearchOutlined />
        </Search>
        <Button>
          <AccountCircleOutlinedIcon />
          SIGN IN
        </Button>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
