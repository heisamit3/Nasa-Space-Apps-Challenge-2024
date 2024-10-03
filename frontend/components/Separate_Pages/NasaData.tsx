import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  color: #333;
  background: #ffffff;
  width: 100%; /* Full width */
  max-width: 1200px; /* Maximum width for larger screens */
  margin: 0 auto; /* Center the container horizontally */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h1`
  color: #205375;
  margin-bottom: 5px;
  font-size: 24px; /* Increased font size */
`;

const Subtitle = styled.h2`
  color: #2C699A;
  margin-bottom: 20px;
  font-size: 20px; /* Increased font size */
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 15px; /* Increased spacing between items */
  position: relative;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f0f0f0;
  min-width: 200px; /* Adjusted width for better appearance */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  z-index: 1;
`;

const DropdownItem = styled.a`
  color: #333;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 18px;
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: #e0e0e0; /* Slightly darker on hover */
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Dropdown = styled.div`
  display: inline-block;
  cursor: pointer;
  position: relative; /* Position relative to contain absolute children */
  
  &:hover ${DropdownContent} {
    display: block; /* Show dropdown on hover */
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
            <span>Another Dataset</span>
            <DropdownContent>
              <DropdownItem onClick={() => handleNavigation("/globalTemp/yearly")}>Map</DropdownItem>
              <DropdownItem onClick={() => handleNavigation("/globalTemp/monthly")}>Statistics</DropdownItem>
              <DropdownItem onClick={() => handleNavigation("/globalTemp/daily")}>Simulation</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </ListItem>
        
        <ListItem>
          <Dropdown>
            <span>MiCasa Land Carbon Flux</span>
            <DropdownContent>
              <DropdownItem onClick={() => handleNavigation("/micasa/yearly")}>Map</DropdownItem>
              <DropdownItem onClick={() => handleNavigation("/micasa/monthly")}>Statistics</DropdownItem>
              <DropdownItem onClick={() => handleNavigation("/micasa/daily")}>Simulation</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </ListItem>

        <ListItem>
          <Dropdown>
            <span>CH4</span>
            <DropdownContent>
              <DropdownItem onClick={() => handleNavigation("/ch4-flux-comparison")}>Map</DropdownItem>
              <DropdownItem onClick={() => handleNavigation("/ch4-map-with-data")}>Statistics</DropdownItem>
              <DropdownItem onClick={() => handleNavigation("/ch4-simul")}>Simulation</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </ListItem>
        
        {/* Add more dropdowns as needed */}
      </List>
    </Container>
  );
};

export default NasaData;
