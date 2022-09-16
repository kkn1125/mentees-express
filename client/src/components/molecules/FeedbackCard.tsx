import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import {
  Chip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CopyButton from "../atoms/CopyButton";
import FeedbackUser from "../atoms/FeedbackUser";
import LikeIcon from "../atoms/LikeIcon";
import TextOverflow from "../atoms/TextOverflow";
import ViewIcon from "../atoms/ViewIcon";

interface FeedbackCardProps {
  contents: any;
  idx: number;
  wide: boolean;
}

const WideCard = ({ contents, idx }) => {
  const { num, view, title, content, author, tags, regdate, updates } =
    contents;

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      component={Paper}
      elevation={5}
      data-aos='fade-left'
      data-aos-delay={100 * idx}>
      <Stack
        alignItems='center'
        justifyContent='center'
        sx={{
          width: (theme) => ({
            xs: theme.typography.pxToRem(800),
            md: theme.typography.pxToRem(350),
          }),
          maxWidth: "100%",
          overflow: "hidden",
        }}>
        <SvgIcon
          sx={{
            fontSize: 150,
          }}>
          <SmsOutlinedIcon />
        </SvgIcon>
      </Stack>
      <Stack
        sx={{
          p: 3,
          gap: 2,
        }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'>
          <Typography
            component={Link}
            to={`/mentees/feedback/${num}`}
            variant='h6'
            color='primary'
            sx={{
              fontWeight: 700,
              textTransform: "capitalize",
              textDecoration: "none",
              color: "inherit",
              transition: `150ms ease-in-out`,
              [`&:hover`]: {
                color: (theme) => theme.palette.primary.main,
              },
            }}>
            {title}
          </Typography>
          <Stack direction='row' sx={{ gap: 2 }}>
            <LikeIcon pnum={num} type='feed' />
            <ViewIcon count={view} />
          </Stack>
        </Stack>

        <Typography variant='body1' sx={{ fontWeight: 700 }}>
          {author}
        </Typography>

        <TextOverflow>{content}</TextOverflow>
        <Stack direction='row' sx={{ gap: 1 }}>
          {tags.split("_").map((tag, ids) => (
            <Chip key={ids} label={tag} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

const ShortCard = ({ contents, idx }) => {
  const { num, view, title, content, cover, author, tags, regdate, updates } =
    contents;

  return (
    <List
      component={Paper}
      elevation={5}
      data-aos='fade-down'
      data-aos-delay={100 * idx}
      sx={{
        minWidth: 250,
        width: { xs: "100%", md: "20%" },
        maxWidth: { xs: "100%", md: 300 },
      }}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{
          py: 1,
          px: 2,
        }}>
        <ListItemIcon>
          <SmsOutlinedIcon />
        </ListItemIcon>
        <Stack direction='row' sx={{ gap: 2 }}>
          <LikeIcon pnum={num} type='feed' />
          <ViewIcon count={view} />
        </Stack>
      </Stack>
      <ListItem disablePadding>
        <ListItemButton component={Link} to={`/mentees/feedback/${num}`}>
          <ListItemText
            primary={title}
            secondary={<TextOverflow children={content} />}
          />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText
          primary='tags'
          secondary={tags.split("_").map((item, idx) => (
            <Chip key={idx} size='small' label='test' />
          ))}
          primaryTypographyProps={{
            mb: 1,
          }}
          secondaryTypographyProps={{
            component: "div",
            display: "flex",
            gap: 1,
          }}
        />
      </ListItem>
      <Divider />
      <ListItem
        sx={{
          justifyContent: "space-between",
          gap: 1,
        }}>
        <Stack direction='row' alignItems='center' sx={{ gap: 1 }}>
          <FeedbackUser cover={cover} author={author} />
        </Stack>
        <CopyButton url={`${location.origin}/mentees/feedback/${num}`} />
      </ListItem>
    </List>
  );
};

function FeedbackCard({ contents, idx, wide }: FeedbackCardProps) {
  const navigate = useNavigate();

  return wide ? (
    <WideCard contents={contents} idx={idx} />
  ) : (
    <ShortCard contents={contents} idx={idx} />
  );
}

FeedbackCard.defaultProps = {
  wide: false,
};

export default FeedbackCard;
