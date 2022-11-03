import { useParams, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import Button from "@mui/material/Button";

const ShopEdit = ({ setShops, shops, loading }) => {
  const params = useParams();
  const shop = shops?.find((shop) => shop.id === +params.id);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    itemName: Yup.string().required("Required").min(2).max(60),
    count: Yup.number().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      itemName: "",
      count: 0,
    },
    onSubmit: (values) => {
      if (params.id !== "new") {
        setShops((prevState) =>
          prevState.map((shop) => {
            if (+params.id === shop.id) {
              return {
                ...shop,
                itemName: values.itemName,
                count: values.count,
              };
            }

            return shop;
          })
        );
      } else {
        setShops((prevState) => [
          ...prevState,
          {
            id: prevState.length + 1,
            itemName: values.itemName,
            count: values.count,
          },
        ]);
      }

      navigate("/shops");
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
    if (shop && shops.length) {
      setFieldValue("itemName", shop?.itemName);
      setFieldValue("count", shop?.count);
    }
    //eslint-disable-next-line
  }, [shops]);

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
          id="itemName"
          name="itemName"
          value={values.itemName}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth={true}
          label="Name"
          error={errors.itemName && touched.itemName}
          helperText={
            errors.itemName && touched.itemName ? errors.itemName : ""
          }
          autoComplete="off"
        />
        <TextField
          variant="outlined"
          id="count"
          name="count"
          value={values.count}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth={true}
          label="Count"
          error={errors.count && touched.count}
          helperText={errors.count && touched.count ? errors.count : ""}
          autoComplete="off"
          type="number"
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }} mt={2}>
          <Button variant="outlined" type="submit">
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ShopEdit;
