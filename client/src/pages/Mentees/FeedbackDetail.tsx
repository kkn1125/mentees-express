import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CopyButton from "../../components/atoms/CopyButton";
import LikeIcon from "../../components/atoms/LikeIcon";
import ViewIcon from "../../components/atoms/ViewIcon";
import UserProfile from "../../components/molecules/UserProfile";
import { FeedbackContext } from "../../contexts/FeedbackProvider";
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";

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
  const feedbacks = useContext(FeedbackContext);

  const feedback = useMemo<Feedback>(
    () => feedbacks.find((prod) => prod.num === Number(params.num)) || {},
    [feedbacks]
  );

  return (
    <Container sx={{ pt: 10 }}>
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
          <Stack direction='row' sx={{ gap: 3 }}>
            <Stack direction='row' sx={{ gap: 1 }}>
              <LikeIcon pnum={feedback.num} type='feed' />
              <ViewIcon count={feedback.view} />
            </Stack>
          </Stack>
        </Stack>
        <CopyButton url={`${location.href}`} />
      </Stack>

      <Divider sx={{ my: 2 }} />
      <UserProfile
        nickname='kimson'
        src='https://avatars.githubusercontent.com/u/71887242?v=4'
        time={new Date()}
      />

      <Typography variant='body1' sx={{ my: 5 }}>
        {parse(feedback.content, options)}
      </Typography>
      {/* <Stack
        direction='row'
        justifyContent='flex-end'
        alignItems='center'
        sx={{ gap: 2 }}>
        <Button color='error' variant='contained'>
          찜하기
        </Button>
      </Stack> */}

      <Divider sx={{ my: 2 }} />

      <Stack direction='row' sx={{ gap: 2 }}>
        <Chip label='test' />
        <Chip label='test' />
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
        Comments
      </Typography>

      <Box component={Paper} elevation={5} sx={{ p: 3 }}>
        <UserProfile
          nickname='kimson'
          src='https://avatars.githubusercontent.com/u/71887242?v=4'
          time={new Date()}
        />

        <Stack sx={{ gap: 1, mt: 2 }} alignItems='flex-end'>
          <Box>
            <Button variant='outlined'>등록</Button>
          </Box>
          <TextField fullWidth multiline rows={5} />
        </Stack>
      </Box>
    </Container>
  );
}

export default FeedbackDetail;
