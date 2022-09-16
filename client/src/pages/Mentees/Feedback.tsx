import { Alert, Box, Button, Container, Stack, Toolbar } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FeedbackCard from "../../components/molecules/FeedbackCard";
import PaginationController from "../../components/molecules/PaginationController";
import { CommentContext } from "../../contexts/CommentProvider";
import { FeedbackContext } from "../../contexts/FeedbackProvider";
import { dummyFeedbacks, queryStringToObject } from "../../utils/tools";

const limit = 3;

function Feedback() {
  const locate = useLocation();
  const feedbacks = useContext(FeedbackContext);
  const comments = useContext(CommentContext);
  const [currentPage, setCurrentPage] = useState(1);

  const feedbackList = useMemo(
    () =>
      feedbacks.length > 0 ? (
        feedbacks
          .slice((currentPage - 1) * limit, currentPage * limit)
          .map((contents, idx) => (
            <FeedbackCard
              key={idx}
              contents={contents}
              idx={idx}
              wide
              comments={comments.filter(
                (comment) =>
                  comment.pnum === contents.num && comment.type === "feedbacks"
              )}
            />
          ))
      ) : (
        <Alert severity='warning'>등록된 피드백이 없습니다.</Alert>
      ),
    [feedbacks]
  );

  useEffect(() => {
    const query = queryStringToObject(locate.search);
    const { page } = query;
    if (page) {
      setCurrentPage(page);
    } else {
      setCurrentPage(1);
    }
  }, [location.href]);

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

      <PaginationController totalPages={Math.ceil(feedbacks.length / limit)} />
    </Container>
  );
}

export default Feedback;
