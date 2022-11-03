import Box from "@mui/material/Box";
import { Item, Link, SelectedLink } from "./styles";
import { Typography } from "@mui/material";

const Header = () => {
  const preventDefault = (event) => event.preventDefault();

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        typography: "body1",
        "& > :not(style) + :not(style)": {
          ml: 2,
        },
      }}
      component="ul"
      onClick={preventDefault}
    >
      <Item component="li" sx={{ listStyleType: "none" }}>
        <Link to="/users">
          {({ isActive }) => {
            if (isActive) return <SelectedLink>Users</SelectedLink>;
            return <Typography>Users</Typography>;
          }}
        </Link>
      </Item>
      <Item component="li">
        <Link to="/shops">
          {({ isActive }) => {
            if (isActive) return <SelectedLink>Shops</SelectedLink>;
            return <Typography>Shops</Typography>;
          }}
        </Link>
      </Item>
      <Item component="li">
        <Link to="/orders">
          {({ isActive }) => {
            if (isActive) return <SelectedLink>Orders</SelectedLink>;
            return <Typography>Orders</Typography>;
          }}
        </Link>
      </Item>
    </Box>
  );
};

export default Header;
