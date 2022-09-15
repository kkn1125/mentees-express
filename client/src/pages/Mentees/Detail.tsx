import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import React, { memo, useContext, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LikeIcon from "../../components/atoms/LikeIcon";
import ViewIcon from "../../components/atoms/ViewIcon";
import UserProfile from "../../components/molecules/UserProfile";
import { ProductContext } from "../../contexts/ProductProvider";
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
  const products = useContext(ProductContext);

  useEffect(() => {
    if (isNaN(Number(params.num))) {
      navigate(-1);
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const product = useMemo<Product>(
    () => products.find((prod) => prod.num === Number(params.num)) || {},
    [products]
  );

  const handleScroll = (e: Event) => {
    const heightGap = document.body.scrollHeight - window.innerHeight;
    if (imgRef.current) {
      imgRef.current.style.top = `${(window.scrollY / heightGap) * 100}%`;
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
              <LikeIcon pnum={product.num} />
              <ViewIcon count={product.view} />
            </Stack>
            <Chip color='primary' label={product.type} />
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />
        <UserProfile
          nickname={product.id}
          src='https://avatars.githubusercontent.com/u/71887242?v=4'
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
            {product.tags.split("_").map((tag, idx) => (
              <Chip key={tag + idx} label={tag} />
            ))}
          </Stack>

          <Stack direction='row' sx={{ gap: 2 }}>
            <Button color='success' variant='contained'>
              신청
            </Button>
            <Button color='error' variant='contained'>
              찜하기
            </Button>
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
    </Box>
  );
}

export default memo(Detail);
