import { Alert, Box, Button, Container, Stack, Toolbar } from "@mui/material";
import React, { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import FeedbackCard from "../../components/molecules/FeedbackCard";
import PaginationController from "../../components/molecules/PaginationController";
import { CommentContext } from "../../contexts/CommentProvider";
import { FeedbackContext } from "../../contexts/FeedbackProvider";
import { dummyFeedbacks } from "../../utils/tools";

function Feedback() {
  const feedbacks = useContext(FeedbackContext);
  const comments = useContext(CommentContext);

  const feedbackList = useMemo(
    () =>
      feedbacks.length > 0 ? (
        feedbacks.map((contents, idx) => (
          <FeedbackCard
            key={idx}
            contents={contents}
            idx={idx}
            wide
            comments={comments.filter(
              (comment) => comment.pnum === contents.num
            )}
          />
        ))
      ) : (
        <Alert severity='warning'>등록된 피드백이 없습니다.</Alert>
      ),
    [feedbacks]
  );

  return (
    <Container maxWidth={"lg"}>
      <Toolbar />
      <Stack direction='row' justifyContent='flex-end' sx={{ gap: 1, mb: 3 }}>
        <Button
          component={Link}
          to='/mentees/feedback/form'
          variant='contained'
          color='success'>
          피드백 등록하기
        </Button>
      </Stack>
      <Stack
        sx={{
          gap: 3,
        }}>
        {feedbackList}
      </Stack>

      <PaginationController />
    </Container>
  );
}

export default Feedback;
