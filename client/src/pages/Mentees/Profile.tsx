import {
  Avatar,
  Box,
  Container,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserProvider";
import { orElseImage } from "../../utils/tools";

function Profile() {
  const users = useContext(UserContext);
  return (
    <Box>
      <Toolbar />
      <Container maxWidth='md'>
        <Stack
          component={Paper}
          alignItems='center'
          sx={{
            p: 5,
          }}>
          <Avatar
            src={orElseImage(users.cover)}
            sx={{ width: 250, height: 250, mb: 3 }}
          />
          <Typography variant='h5' sx={{ fontWeight: 700 }}>
            {users.email}
          </Typography>
          <Typography variant='h6'>{users.id}</Typography>
          <Toolbar />
          <TextField fullWidth sx={{ mb: 1 }} />
          <TextField fullWidth sx={{ mb: 1 }} />
          <TextField fullWidth sx={{ mb: 1 }} />
        </Stack>
      </Container>
    </Box>
  );
}

export default Profile;
