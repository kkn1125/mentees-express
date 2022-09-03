import { Box, Container, Stack, Toolbar } from "@mui/material";
import React, { useState } from "react";
import FeedbackCard from "../../components/molecules/FeedbackCard";
import PaginationController from "../../components/molecules/PaginationController";
import { dummyFeedbacks } from "../../utils/tools";

function Feedback() {
  const [contents, setContents] = useState(dummyFeedbacks);

  return (
    <Container maxWidth={"lg"}>
      <Toolbar />
      <Stack
        sx={{
          gap: 3,
        }}>
        {contents.map((contents, idx) => (
          <FeedbackCard key={idx} contents={contents} idx={idx} wide />
        ))}
      </Stack>

      <PaginationController />
    </Container>
  );
}

export default Feedback;
