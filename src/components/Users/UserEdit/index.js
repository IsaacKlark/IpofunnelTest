import { useParams, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
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

const UserEdit = ({ setUsers, users, loading, orders }) => {
  const params = useParams();
  const user = users?.find((user) => user.id === +params.id);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required").min(2).max(60),
    email: Yup.string()
      .email()
      .matches(
        //eslint-disable-next-line
        /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/g,
        "incorrect email"
      )
      .required("Required")
      .min(2)
      .max(100),
    password: Yup.string().required("Required").min(8).max(60),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      orders: [],
    },
    onSubmit: (values) => {
      if (params.id !== "new") {
        setUsers((prevState) =>
          prevState.map((user) => {
            if (+params.id === user.id) {
              return {
                ...user,
                name: values.name,
                email: values.email,
                password: values.password,
                orders: values.orders,
              };
            }

            return user;
          })
        );
      } else {
        setUsers((prevState) => [
          ...prevState,
          {
            id: prevState.length,
            name: values.name,
            email: values.email,
            password: values.password,
            orders: values.orders,
          },
        ]);
      }

      navigate("/users");
    },
    validationSchema,
  });

  const {
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
  } = formik;

  useEffect(() => {
    if (user && users.length) {
      setFieldValue("name", user?.name);
      setFieldValue("email", user?.email);
      setFieldValue("password", user?.password);
      setFieldValue(
        "orders",
        orders
          .filter((order) => user?.orders.includes(order.id))
          .map((order) => order.id)
      );
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
        mt={6}
      >
        <TextField
          variant="outlined"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth={true}
          label="Name"
          error={errors.name && touched.name}
          helperText={errors.name && touched.name ? errors.name : ""}
          autoComplete="off"
        />
        <TextField
          variant="outlined"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth={true}
          label="Email"
          error={errors.email && touched.email}
          helperText={errors.email && touched.email ? errors.email : ""}
          autoComplete="off"
        />
        <TextField
          variant="outlined"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth={true}
          label="Password"
          type="password"
          error={errors.password && touched.password}
          helperText={
            errors.password && touched.password ? errors.password : ""
          }
          autoComplete="off"
        />

        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="orders">Orders</InputLabel>
          <Select
            labelId="orders"
            id="orders"
            multiple
            name="orders"
            value={values?.orders}
            onChange={handleChange}
            input={<OutlinedInput label="Orders" />}
            MenuProps={MenuProps}
          >
            {orders.map((order) => (
              <MenuItem key={order.id} value={order.id}>
                {order.items.join(", ")}
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

export default UserEdit;
