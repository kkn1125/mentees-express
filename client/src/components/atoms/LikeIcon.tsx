import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Stack, SvgIcon, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { api } from "../../apis";
import { ProductContext } from "../../contexts/ProductProvider";
import { UserContext } from "../../contexts/UserProvider";

interface LikeIconProps {
  pnum?: number;
  type: "likes" | "feed";
}

function LikeIcon({ pnum, type }: LikeIconProps) {
  const [count, setCount] = useState<number>(0);
  const [own, setOwn] = useState<boolean>(false);
  const users = useContext(UserContext);
  const products = useContext(ProductContext);

  useEffect(() => {
    // api 사용해야 함
    if (pnum) {
      api[type].findByPid(pnum).then((result) => {
        const { data } = result;
        const { payload } = data;
        // console.log(data);
        setCount(payload ? payload.length : 0);
        setOwn(Boolean(payload.find((like) => like.mnum === users.num)));
      });
    }
  }, [products]);

  const handleCount = () => {
    if (!own) {
      setCount(count + 1);
      api.likes.create(pnum, users.num);
    } else {
      setCount(count - 1);
      api.likes.delete(pnum, users.num);
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
