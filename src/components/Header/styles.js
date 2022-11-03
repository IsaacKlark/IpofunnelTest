import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";

export const Item = styled(Box)`
  list-style-type: none;
`;

export const Link = styled(NavLink)`
  text-decoration: none;
  color: gray;

  p {
    font-size: 20px;
  }
`;

export const SelectedLink = styled(Typography)`
  text-decoration: underline;
`;
