import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Stack, SvgIcon, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { api } from "../../apis";
import { ProductContext } from "../../contexts/ProductProvider";
import { UserContext } from "../../contexts/UserProvider";
import useSnack from "../../hooks/useSnack";

interface LikeIconProps {
  pnum?: number;
  type: "likes" | "feeds";
}

function LikeIcon({ pnum, type }: LikeIconProps) {
  const [count, setCount] = useState<number>(0);
  const [own, setOwn] = useState<boolean>(false);
  const users = useContext(UserContext);
  const products = useContext(ProductContext);
  const { warningSnack } = useSnack();

  useEffect(() => {
    // api 사용해야 함
    if (pnum) {
      api[type][type === "feeds" ? "findByFnum" : "findByPnum"](pnum).then(
        (result) => {
          const { data } = result;
          const { payload } = data;
          // console.log(data);
          setCount(payload ? payload.length : 0);
          setOwn(Boolean(payload.find((like) => like.mnum === users.num)));
        }
      );
    }
  }, [products]);

  const handleCount = () => {
    if (!users.num) {
      warningSnack("로그인 후 사용 해주세요.");
      return;
    }
    if (!own) {
      setCount(count + 1);
      api[type].create(pnum, users.num);
    } else {
      setCount(count - 1);
      api[type].delete(pnum, users.num);
    }
    setOwn(!own);
  };

  return (
    <Stack direction='row' alignItems='center' sx={{ gap: 0.5 }}>
      <IconButton onClick={handleCount}>
        <SvgIcon fontSize='small' color={own ? "error" : "inherit"}>
          <FavoriteIcon />
        </SvgIcon>
      </IconButton>
      <Typography variant='body2'>{count}</Typography>
    </Stack>
  );
}

LikeIcon.defaultProps = {
  type: "likes",
};

export default LikeIcon;
