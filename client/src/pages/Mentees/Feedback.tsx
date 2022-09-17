import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Stack,
  Toolbar,
} from "@mui/material";
import React, {
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import FeedbackCard from "../../components/molecules/FeedbackCard";
import PaginationController from "../../components/molecules/PaginationController";
import { CommentContext } from "../../contexts/CommentProvider";
import { FeedbackContext } from "../../contexts/FeedbackProvider";
import useQuery from "../../hooks/useQuery";

const limit = 3;

function Feedback() {
  const query = useQuery();
  const comments = useContext(CommentContext);
  const feedbacks = useContext(FeedbackContext);
  const [loading, setLoading] = useState(true);
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
    [query]
  );

  useEffect(() => {
    setLoading(false);
  }, [location.search]);

  useEffect(() => {
    const { page } = query;
    if (page) {
      setCurrentPage(page);
    } else {
      setCurrentPage(1);
    }
  }, [location.search]);

  const handleLoading = () => {
    setLoading(true);
  };

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
        {loading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}>
            <CircularProgress color='inherit' />
          </Backdrop>
        ) : (
          feedbackList
        )}
      </Stack>

      <PaginationController
        handleLoading={handleLoading}
        totalPages={Math.ceil(feedbacks.length / limit)}
      />
    </Container>
  );
}

export default Feedback;
