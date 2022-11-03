import styled from "@emotion/styled";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

export const Edit = styled(EditIcon)`
  color: black;

  &:hover {
    color: gray;
  }
`;

export const ButtonLink = styled(Link)`
  padding-top: 5px;
  padding-right: 15px;
  padding-bottom: 5px;
  padding-left: 15px;
  cursor: pointer;
  color: #1976d2;
  border: 1px solid rgba(25, 118, 210, 0.5);
  border-radius: 4px;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  text-decoration: none;
  margin-bottom: 20px
`;
