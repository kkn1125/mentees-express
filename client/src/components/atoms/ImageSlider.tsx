import { Box, IconButton, styled, SvgIcon } from "@mui/material";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

let loop;

interface ImageSliderProps {
  images: string[];
  autoPlay: boolean;
  delay: number;
  hideControls: boolean;
}

function ImageSlider(props: ImageSliderProps) {
  const { images, autoPlay, delay, hideControls } = props;
  const left = images[images.length - 1];
  const right = images[0];
  const max = images.length + 2;
  const [isMove, setIsMove] = useState(false);
  const [slideImageList, setSlideImageList] = useState([
    left,
    ...images,
    right,
  ]);

  const [slideNum, setSlideNum] = useState(
    new Array(max).fill(0).map((o, i) => i)
  );

  useEffect(() => {
    if (autoPlay) {
      loop = setTimeout(() => {
        handleRightSilde();
      }, delay * 5);
    }
    return () => {
      clearTimeout(loop);
    };
  }, [slideNum]);

  const handleRightSilde = () => {
    clearTimeout(loop);
    const last = slideNum[slideNum.length - 1];
    const origin = slideNum.slice(0, slideNum.length - 1);
    setSlideNum([last, ...origin]);
    setIsMove(true);
    setTimeout(() => {
      setIsMove(false);
    }, delay);
  };

  const handleLeftSilde = () => {
    clearTimeout(loop);
    const [first, ...rest] = slideNum;
    setSlideNum(rest.concat(first));
    setIsMove(true);
    setTimeout(() => {
      setIsMove(false);
    }, delay);
  };

  const imageSlideList = useMemo(
    () =>
      slideImageList.map((image, idx) => (
        <Box
          key={idx}
          component='img'
          src={image}
          alt={idx.toString()}
          sx={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            position: "absolute",
            left: (slideNum[idx] - 1) * 100 + "%",
            transition: "500ms ease",
            zIndex: slideNum[idx] === 1 ? 100 : 0,
          }}
        />
      )),
    [slideNum]
  );

  return (
    <Box
      sx={{
        position: "relative",
        height: 400,
      }}>
      {!hideControls && (
        <Fragment>
          <IconButton
            onClick={() => {
              if (isMove) return;
              handleLeftSilde();
            }}
            sx={{
              position: "absolute",
              top: "50%",
              left: "1%",
              transform: "translateY(-50%)",
              zIndex: 200,
              [`&:hover`]: {
                transition: "150ms ease",
                boxShadow: "0 0 5px 0 #00000055",
              },
            }}>
            <SvgIcon
              fontSize='large'
              sx={{
                transform: "rotate(180deg)",
                color: "#00000060",
              }}>
              <ArrowForwardIosIcon />
            </SvgIcon>
          </IconButton>
          <IconButton
            onClick={() => {
              if (isMove) return;
              handleRightSilde();
            }}
            sx={{
              position: "absolute",
              top: "50%",
              right: "1%",
              transform: "translateY(-50%)",
              zIndex: 200,
              [`&:hover`]: {
                transition: "150ms ease",
                boxShadow: "0 0 5px 0 #00000055",
              },
            }}>
            <SvgIcon
              fontSize='large'
              sx={{
                color: "#00000060",
              }}>
              <ArrowForwardIosIcon />
            </SvgIcon>
          </IconButton>
        </Fragment>
      )}
      <Slider>{imageSlideList}</Slider>
    </Box>
  );
}

const Slider = styled(Box)`
  position: relative;
  display: flex;
  height: 100%;
  overflow: hidden;
`;

ImageSlider.defaultProps = {
  autoPlay: false,
  delay: 1000,
  hideControls: false,
};

export default ImageSlider;
