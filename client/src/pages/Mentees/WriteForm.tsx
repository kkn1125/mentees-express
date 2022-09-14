import { Box, TextField, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductProvider";

interface WriteFormprops {
  mode: "create" | "update";
}

interface FormProps {
  product: any;
}

const CreateForm = ({ product }: FormProps) => {
  return (
    <Container maxWidth='md'>
      <TextField size='small' fullWidth value={product?.title || ""} />
    </Container>
  );
};

const UpdateForm = ({ product }: FormProps) => {
  return <Box>{product.title}</Box>;
};

function WriteForm({ mode }: WriteFormprops) {
  const params = useParams();
  const { num } = params;
  const products = useContext(ProductContext);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const foundProduct = products.find((prod) => prod.num === num);
    setProduct(foundProduct);
  }, [products]);

  return (
    <Container maxWidth={"lg"}>
      <Toolbar />
      {mode === "create" ? (
        <CreateForm product={product} />
      ) : (
        <UpdateForm product={product} />
      )}
    </Container>
  );
}

WriteForm.defaultProps = {
  mode: "create",
};

export default WriteForm;
