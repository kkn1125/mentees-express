import { Button, Container, Stack, Toolbar } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PaginationController from "../../components/molecules/PaginationController";
import ProgramCard from "../../components/molecules/ProgramCard";
import { ProductContext } from "../../contexts/ProductProvider";

function Programs() {
  const products = useContext(ProductContext);

  return (
    <Container maxWidth={"lg"}>
      <Toolbar />
      <Stack direction='row' justifyContent='flex-end' sx={{ gap: 1, mb: 3 }}>
        <Button
          component={Link}
          to='/mentees/form'
          variant='contained'
          color='success'>
          프로그램 등록하기
        </Button>
      </Stack>
      <Stack
        sx={{
          gap: 3,
        }}>
        {products.map((contents, idx) => (
          <ProgramCard key={idx} contents={contents} idx={idx} />
        ))}
      </Stack>

      <PaginationController />
    </Container>
  );
}

export default Programs;
