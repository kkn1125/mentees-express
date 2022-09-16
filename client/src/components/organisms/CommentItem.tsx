import {
  Box,
  Button,
  Grow,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserProvider";
import UserProfile from "../molecules/UserProfile";
import * as yup from "yup";
import { api } from "../../apis";
import useSnack from "../../hooks/useSnack";

type Type = "products" | "feedbacks";

const validationSchema = yup.object({
  pnum: yup.number().required("필수항목 입니다."),
  cnum: yup.number().required("필수항목 입니다."),
  order: yup.number().required("필수항목 입니다."),
  layer: yup.number().required("필수항목 입니다."),
  author: yup.string().required("필수항목 입니다."),
  type: yup.string().required("필수항목 입니다."),
  content: yup.string(),
  visible: yup.number(),
});

interface CommentItemProps {
  pnum: number;
  cnum: number;
  order: number;
  layer: number;
  type: Type;
  comment?: Comments;
}

function CommentItem({
  pnum,
  cnum,
  order,
  layer,
  type,
  comment,
}: CommentItemProps) {
  const users = useContext(UserContext);
  const { successSnack, warningSnack } = useSnack();
  const [writeMode, setWriteMode] = useState(false);
  const formik = useFormik({
    initialValues: {
      pnum: null,
      cnum: null,
      order: 0,
      layer: 0,
      author: "",
      type: "",
      content: "",
      visible: 1,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      if (values.content.length === 0) {
        warningSnack("내용을 입력해야합니다.");
        return;
      }
      try {
        if (comment) {
          formik.values.layer = comment.layer + 1;
          const lastOrder = await api.comment.getLastOrderNumber(comment.cnum);
          formik.values.order = lastOrder.data.payload + 1;
        }
        const { data } = await api.comment.create(values);
        if (data.ok) {
          successSnack("댓글이 등록되었습니다.");
          setWriteMode(false);

          // 초기화
        }
      } catch (e: any) {
        const { response } = e;
        warningSnack(response.data.message);
      } finally {
        resetForm();
      }
    },
  });

  useEffect(() => {
    if (users.num) {
      formik.values.author = users.id;
      formik.values.pnum = pnum;
      formik.values.cnum = cnum;
      formik.values.order = order;
      formik.values.layer = layer;
      formik.values.type = type;
    }
  }, [users]);

  const handleWriteMode = () => {
    setWriteMode(!writeMode);
  };

  return (
    <Box
      component={comment ? Paper : "div"}
      {...(comment && { elevation: 5 })}
      sx={{
        p: comment ? 5 : 0,
        ml: layer * 5,
        position: "relative",
        ...(layer > 0 && {
          [`&::before`]: {
            position: "absolute",
            top: "1%",
            right: "101%",
            content: '"RE:"',
            fontSize: (theme) => theme.typography.pxToRem(20),
            fontWeight: 700,
          },
        }),
      }}>
      <Stack sx={{ gap: 1, mt: 2, flex: 1 }}>
        <Stack direction='row' justifyContent='space-between' sx={{ flex: 1 }}>
          {comment ? (
            <UserProfile
              nickname='kimson'
              src='https://avatars.githubusercontent.com/u/71887242?v=4'
              time={new Date()}
            />
          ) : (
            <Box />
          )}
          <Box>
            <Button
              color={!comment ? "primary" : "warning"}
              variant='contained'
              onClick={handleWriteMode}
              sx={{ float: "right" }}>
              {comment ? "답글" : "댓글"} 작성
            </Button>
          </Box>
        </Stack>
        {comment && <Typography gutterBottom>{comment.content}</Typography>}
        {writeMode && (
          <Grow in={writeMode} style={{ transformOrigin: "0 0 0" }}>
            <Box component={Paper} elevation={5} sx={{ p: 3 }}>
              <Stack
                component='form'
                onSubmit={formik.handleSubmit}
                sx={{ gap: 1, mt: 2, flex: 1 }}>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  sx={{ flex: 1 }}>
                  <UserProfile
                    nickname='kimson'
                    src='https://avatars.githubusercontent.com/u/71887242?v=4'
                    time={new Date()}
                  />
                  <Box>
                    <Button variant='outlined' type='submit'>
                      등록
                    </Button>
                  </Box>
                </Stack>

                <TextField
                  name='content'
                  fullWidth
                  multiline
                  rows={5}
                  value={formik.values.content}
                  onChange={formik.handleChange}
                />
              </Stack>
            </Box>
          </Grow>
        )}
      </Stack>
    </Box>
  );
}

export default CommentItem;
