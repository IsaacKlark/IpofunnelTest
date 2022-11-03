import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Edit, ButtonLink } from "./styles";
import CircularProgress from "@mui/material/CircularProgress";

const Users = ({ users, orders, loading }) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }} mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ maxWidth: "800px" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <ButtonLink to="/users/new">
          Add new
        </ButtonLink>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          width: "100%",
          gap: "16px",
        }}
      >
        {users.map((user) => {
          const currentOrders = orders
            .filter((order) => user.orders.includes(order.id))
            .map((order) => order.items.join(", "));

          return (
            <Card key={user.id} sx={{ padding: "14px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  title={user.name}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: "18px",
                  }}
                >
                  {user.name}
                </Typography>
                <Link to={`/users/${user.id}`}>
                  <Edit />
                </Link>
              </Box>
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "gray",
                  fontSize: "14px",
                }}
              >
                {user.email}
              </Typography>

              <Typography
                sx={{
                  fontSize: "14px",
                }}
                mt={2}
              >
                <Box component="span" sx={{ fontWeight: "700" }}>
                  Orders:
                </Box>{" "}
                {currentOrders.join(", ")}
              </Typography>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
};

export default Users;
