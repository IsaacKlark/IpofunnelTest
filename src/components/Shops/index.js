import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Edit, ButtonLink } from "./styles";
import CircularProgress from "@mui/material/CircularProgress";

const Shops = ({ shops, loading }) => {
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
        <ButtonLink to="/shops/new">
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
        {shops.map((shop) => {
          return (
            <Card key={shop.id} sx={{ padding: "14px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  title={shop.name}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: "18px",
                  }}
                >
                  Name: {shop.itemName}
                </Typography>
                <Link to={`/shops/${shop.id}`}>
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
                Count: {shop.count}
              </Typography>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
};

export default Shops;
