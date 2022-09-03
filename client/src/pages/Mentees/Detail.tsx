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
import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserProfile from "../../components/molecules/UserProfile";

function Detail() {
  const params = useParams<any>();
  const imgRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(params.id);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          src='http://localhost:8050/resources/img/cover/sample.jpg'
          alt=''
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
          }}
        />
      </Box>
      <Container sx={{ pt: 10 }}>
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
            Title
          </Typography>
          <Chip color='primary' label='Semina' />
        </Stack>

        <Divider sx={{ my: 2 }} />
        <UserProfile
          nickname='kimson'
          src='https://avatars.githubusercontent.com/u/71887242?v=4'
          time={new Date()}
        />

        <Typography variant='body1' sx={{ my: 5 }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati,
          facere! Aspernatur vero adipisci culpa! Quam, perferendis libero
          quisquam enim non quibusdam dicta totam autem alias. Pariatur eos
          expedita facilis tenetur in. Obcaecati magnam dicta fugit quia quaerat
          libero exercitationem deleniti, labore aperiam, quod explicabo beatae
          nulla vitae accusamus esse natus ullam aliquam, ducimus consequatur
          iusto. Pariatur, beatae quas atque dolor eaque nisi! Blanditiis nam
          tenetur sunt aspernatur, facere delectus, fuga inventore voluptates
          provident quas quisquam assumenda praesentium corrupti deserunt,
          perspiciatis laborum! Nihil blanditiis voluptates officia esse numquam
          nulla nisi qui consequatur molestias similique, quae impedit dicta
          quod sint pariatur voluptatibus.
        </Typography>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{ gap: 2 }}>
          <Stack direction='row' sx={{ gap: 2 }}>
            <Typography variant='body2'>2022-09-02 16:03</Typography>
            <Typography variant='body2'>~</Typography>
            <Typography variant='body2'>2022-09-03 16:03</Typography>
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
    </Box>
  );
}

export default Detail;
