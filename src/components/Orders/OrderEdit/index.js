import { useParams, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import TagsInput from "../../TagsInput";
import { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const OrderEdit = ({ setOrders, users, loading, orders }) => {
  const params = useParams();
  const order = orders?.find((order) => order.id === +params.id);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    user: Yup.string().required("Required"),
    items: Yup.array().min(1).max(10),
  });

  const formik = useFormik({
    initialValues: {
      user: 0,
      items: [],
    },
    onSubmit: (values) => {
      if (params.id !== "new") {
        setOrders((prevState) =>
          prevState.map((order) => {
            if (+params.id === order.id) {
              return {
                ...order,
                user: values.user,
                items: values.items,
              };
            }

            return order;
          })
        );
      } else {
        setOrders((prevState) => [
          ...prevState,
          {
            id: prevState.length,
            user: values.user,
            items: values.items,
          },
        ]);
      }

      navigate("/orders");
    },
    validationSchema,
  });

  const { values, handleChange, errors, touched, handleSubmit, setFieldValue } =
    formik;

  useEffect(() => {
    if (order && orders.length) {
      setFieldValue("user", order?.user);
      setFieldValue("items", order?.items);
    }
    //eslint-disable-next-line
  }, [users, orders]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }} mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ maxWidth: "600px" }}>
      <Box
        component="form"
        sx={{ display: "grid", gap: "16px" }}
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        mt={6}
      >
        <TagsInput
          tags={values.items}
          selectedTags={(values) => {
            setFieldValue("items", values);
          }}
          fullWidth
          variant="outlined"
          id="items"
          name="items"
          placeholder="Items"
          label="items"
        />
        {errors.items && touched.items ? (
          <Typography
            sx={{
              color: "#d32f2f",
              fontSize: "0.75rem",
              marginLeft: "14px",
              position: "relative",
              top: "-14px",
            }}
          >
            {errors.items}
          </Typography>
        ) : null}
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="user">User</InputLabel>
          <Select
            labelId="user"
            id="user"
            name="user"
            value={values.user}
            onChange={handleChange}
            input={<OutlinedInput label="User" />}
            MenuProps={MenuProps}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
          <Button variant="outlined" type="submit">
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default OrderEdit;
