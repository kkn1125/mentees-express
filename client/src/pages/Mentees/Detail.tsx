import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import React, {
  Fragment,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../apis";
import CommentIcon from "../../components/atoms/CommentIcon";
import LikeIcon from "../../components/atoms/LikeIcon";
import ViewIcon from "../../components/atoms/ViewIcon";
import UserProfile from "../../components/molecules/UserProfile";
import CommentItem from "../../components/organisms/CommentItem";
import { CommentContext } from "../../contexts/CommentProvider";
import { ProductContext } from "../../contexts/ProductProvider";
import { UserContext } from "../../contexts/UserProvider";
import useSnack from "../../hooks/useSnack";
import { dateFormat, orElseImage } from "../../utils/tools";

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

function Detail() {
  const params = useParams<any>();
  const imgRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();
  const users = useContext(UserContext);
  const comments = useContext(CommentContext);
  const products = useContext(ProductContext);
  const { successSnack, errorSnack } = useSnack();
  const [owner, setOwner] = useState(null);

  const product = useMemo<Product>(
    () => products.find((prod) => prod.num === Number(params.num)) || {},
    [products]
  );
  const filteredList = comments.filter(
    (comment) => comment.pnum === product.num && comment.type === "products"
  );
  const productCommentList = useMemo(
    () =>
      filteredList.length > 0 ? (
        filteredList.map((comment) => (
          <CommentItem
            key={comment.num}
            pnum={product.num}
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

  useEffect(() => {
    if (isNaN(Number(params.num))) {
      navigate(-1);
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (product.id) {
      api.members.findById(product.id).then((result) => {
        const { data } = result;
        const { payload } = data;
        setOwner(payload[0]);
      });
    }
  }, [product]);

  const handleScroll = (e: Event) => {
    const heightGap = document.body.scrollHeight - window.innerHeight;
    if (imgRef.current) {
      imgRef.current.style.top = `${(window.scrollY / heightGap) * 100}%`;
    }
  };

  const handleRemoveProduct = () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      api.products
        .delete(String(product.num))
        .then(() => {
          successSnack("프로그램이 삭제 되었습니다.");
        })
        .catch((e) => {
          errorSnack(e.message);
        });
    }
  };

  return (
    <Box>
      <Box
        sx={{
          height: 400,
          overflow: "hidden",
          position: "relative",
        }}>
        <Box
          ref={imgRef}
          component='img'
          src={orElseImage(product.cover)}
          alt=''
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
          }}
        />
      </Box>
      <Container maxWidth='md' sx={{ pt: 10 }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='baseline'>
          <Typography
            variant='h3'
            gutterBottom
            sx={{
              fontWeight: 700,
            }}>
            {product.title}
          </Typography>
          <Stack direction='row' sx={{ gap: 3 }}>
            <Stack direction='row' sx={{ gap: 1 }}>
              <CommentIcon count={filteredList.length} />
              <LikeIcon pnum={product.num} />
              <ViewIcon count={product.view} />
            </Stack>
            <Tooltip title='프로그램 타입' placement='bottom'>
              <Chip color='primary' label={product.type} />
            </Tooltip>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />
        <UserProfile
          nickname={product.id}
          src={owner?.cover || ""}
          time={new Date(product.regdate)}
        />

        <Typography component='div' variant='body1' sx={{ my: 5 }}>
          {parse(product.content || "", options)}
        </Typography>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{ gap: 2 }}>
          <Stack direction='row' sx={{ gap: 2 }}>
            <Typography variant='body2'>
              {dateFormat(new Date(product.start), "yyyy. MM. dd.")}
            </Typography>
            <Typography variant='body2'>~</Typography>
            <Typography variant='body2'>
              {dateFormat(new Date(product.end), "yyyy. MM. dd.")}
            </Typography>
          </Stack>

          <Stack direction='row' sx={{ gap: 2 }}>
            <Typography variant='body2'>마감일</Typography>
            <Typography variant='body2'>
              {dateFormat(new Date(product.until), "yyyy. MM. dd.")}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack direction='row' justifyContent='space-between' sx={{ gap: 2 }}>
          <Stack direction='row' sx={{ gap: 2 }}>
            {(product.tags || "").split("_").map((tag, idx) => (
              <Chip key={tag + idx} label={tag} color='info' />
            ))}
          </Stack>

          <Stack direction='row' sx={{ gap: 2 }}>
            <Tooltip title='이 프로그램 신청하기' placement='bottom'>
              <IconButton color='success'>
                <CheckCircleOutlineIcon />
              </IconButton>
            </Tooltip>
            {users.id === product.id && (
              <Fragment>
                <Tooltip title='수정하기' placement='bottom'>
                  <IconButton
                    color='info'
                    onClick={() => {
                      navigate(`/mentees/form/${product.num}`);
                    }}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='삭제하기' placement='bottom'>
                  <IconButton color='error' onClick={handleRemoveProduct}>
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
              </Fragment>
            )}
          </Stack>
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

        <Stack sx={{ gap: 3 }}>
          {/* 댓글 작성 폼 */}
          <CommentItem
            counts={filteredList.length}
            pnum={product.num}
            cnum={0}
            order={0}
            layer={0}
            type={"products"}
          />
          <Stack sx={{ gap: 2 }}>
            {/* 댓글 리스트 */}
            {productCommentList}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default memo(Detail);
