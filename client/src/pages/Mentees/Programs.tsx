import { Container, Stack, Toolbar } from "@mui/material";
import React, { useState } from "react";
import PaginationController from "../../components/molecules/PaginationController";
import ProgramCard from "../../components/molecules/ProgramCard";
import { dummyProducts } from "../../utils/tools";

function Programs() {
  const [contents, setContents] = useState(dummyProducts);

  return (
    <Container maxWidth={"lg"}>
      <Toolbar />
      <Stack
        sx={{
          gap: 3,
        }}>
        {contents.map((contents, idx) => (
          <ProgramCard key={idx} contents={contents} idx={idx} />
        ))}
      </Stack>

      <PaginationController />
    </Container>
  );
}

export default Programs;
