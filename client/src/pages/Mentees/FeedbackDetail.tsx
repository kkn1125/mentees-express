import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import {
  Alert,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import React, { useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../apis";
import CommentIcon from "../../components/atoms/CommentIcon";
import CopyButton from "../../components/atoms/CopyButton";
import LikeIcon from "../../components/atoms/LikeIcon";
import ViewIcon from "../../components/atoms/ViewIcon";
import UserProfile from "../../components/molecules/UserProfile";
import CommentItem from "../../components/organisms/CommentItem";
import { CommentContext } from "../../contexts/CommentProvider";
import { FeedbackContext } from "../../contexts/FeedbackProvider";
import { UserContext } from "../../contexts/UserProvider";
import useSnack from "../../hooks/useSnack";

const options: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if (
      domNode instanceof Element &&
      domNode.attribs &&
      domNode.attribs.class === "remove"
    ) {
      return <></>;
    }
  },
};

function FeedbackDetail() {
  const navigate = useNavigate();
  const params = useParams<any>();
  const users = useContext(UserContext);
  const comments = useContext(CommentContext);
  const feedbacks = useContext(FeedbackContext);
  const { successSnack, errorSnack } = useSnack();

  const feedback = useMemo<Feedback>(
    () => feedbacks.find((prod) => prod.num === Number(params.num)) || {},
    [feedbacks]
  );

  const filteredList = comments.filter(
    (comment) => comment.pnum === feedback.num && comment.type === "feedbacks"
  );

  const feedbackCommentList = useMemo(
    () =>
      filteredList.length > 0 ? (
        filteredList.map((comment) => (
          <CommentItem
            key={comment.num}
            pnum={feedback.num}
            cnum={comment.cnum}
            order={comment.order}
            layer={comment.layer}
            type={comment.type}
            comment={comment}
          />
        ))
      ) : (
        <Alert severity='warning'>등록된 댓글이 없습니다.</Alert>
      ),
    [comments]
  );

  const handleRemoveFeedback = () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      api.feedbacks
        .deleteByNum(String(feedback.num))
        .then(() => {
          successSnack("프로그램이 삭제 되었습니다.");
        })
        .catch((e) => {
          errorSnack(e.message);
        });
    }
  };

  return (
    <Container maxWidth='md' sx={{ pt: 10 }}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='baseline'>
        <Stack direction='row' alignItems='center' sx={{ gap: 2 }}>
          <SvgIcon fontSize='large'>
            <SmsOutlinedIcon />
          </SvgIcon>
          <Typography
            variant='h3'
            sx={{
              fontWeight: 700,
            }}>
            Title
          </Typography>
        </Stack>
        <Stack direction='row' sx={{ gap: 3 }}>
          <Stack direction='row' sx={{ gap: 1 }}>
            <CommentIcon count={filteredList.length} />
            <LikeIcon pnum={feedback.num} type='feeds' />
            <ViewIcon count={feedback.view} />
          </Stack>
          <CopyButton url={`${location.href}`} />
        </Stack>
      </Stack>

      <Divider sx={{ my: 2 }} />
      <UserProfile
        nickname='kimson'
        src='https://avatars.githubusercontent.com/u/71887242?v=4'
        time={new Date()}
      />

      <Typography component='div' variant='body1' sx={{ my: 5 }}>
        {parse(feedback.content || "", options)}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Stack direction='row' sx={{ gap: 2 }}>
        <Stack direction='row' sx={{ gap: 2 }}>
          <Chip label='test' />
          <Chip label='test' />
        </Stack>
        {users.id === feedback.author && (
          <Button
            variant='contained'
            color='error'
            onClick={handleRemoveFeedback}>
            삭제
          </Button>
        )}
      </Stack>

      <Stack
        direction='row'
        sx={{
          gap: 1,
          mt: 3,
        }}>
        <Button
          variant='contained'
          color='inherit'
          onClick={() => navigate(-1)}>
          이전으로
        </Button>
      </Stack>

      <Typography variant='h6' gutterBottom sx={{ mt: 5, fontWeight: 700 }}>
        Comments [{filteredList.length}]
      </Typography>
      <Stack sx={{ gap: 3 }}>
        {/* 댓글 작성 폼 */}
        <CommentItem
          pnum={feedback.num}
          cnum={0}
          order={0}
          layer={0}
          type={"feedbacks"}
        />
        <Stack sx={{ gap: 2 }}>
          {/* 댓글 리스트 */}
          {feedbackCommentList}
        </Stack>
      </Stack>
    </Container>
  );
}

export default FeedbackDetail;
