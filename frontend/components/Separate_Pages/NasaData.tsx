import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  color: #333;
  background: #fff;
`;

const Title = styled.h1`
  color: #2a4d69;
`;

const Subtitle = styled.h2`
  color: #4b86b4;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  font-size: 18px;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
`;

const DropdownItem = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #f1f1f1
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  &:hover ${DropdownContent} {
    display: block;
  }
`;

const NasaData: React.FC = () => {
  const navigate = useNavigate();

  // Navigate to the route based on selection
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Container>
      <Title>NASA Data</Title>
      <Subtitle>Datasets</Subtitle>

      <List>
        <ListItem>
          <Dropdown>
            <span>Global Temperature</span>
            <DropdownContent>
              <DropdownItem onClick={() => handleNavigation("/globalTemp/yearly")}>Yearly Data</DropdownItem>
              <DropdownItem onClick={() => handleNavigation("/globalTemp/monthly")}>Monthly Data</DropdownItem>
              <DropdownItem onClick={() => handleNavigation("/globalTemp/daily")}>Daily Data</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </ListItem>
        {/* Repeat for other data types */}
      </List>
    </Container>
  );
};

export default NasaData;
