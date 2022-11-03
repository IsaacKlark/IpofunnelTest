import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Edit, ButtonLink } from "./styles";
import CircularProgress from "@mui/material/CircularProgress";

const Orders = ({ users, orders, loading }) => {
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
        <ButtonLink to="/orders/new">Add new</ButtonLink>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          width: "100%",
          gap: "16px",
        }}
      >
        {orders.map((order) => {
          return (
            <Card key={order.id} sx={{ padding: "14px" }}>
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "gray",
                  fontSize: "14px",
                }}
              >
                {order.email}
              </Typography>

              <Typography
                sx={{
                  fontSize: "18px",
                }}
                mt={2}
              >
                <Box component="span" sx={{ fontWeight: "700" }}>
                  Orders:
                </Box>{" "}
                {order.items.join(", ")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  title={users.find((user) => user.id === order.user).name}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: "14px",
                  }}
                >
                  User: {users.find((user) => user.id === order.user).name}
                </Typography>
                <Link to={`/orders/${order.id}`}>
                  <Edit />
                </Link>
              </Box>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
};

export default Orders;
