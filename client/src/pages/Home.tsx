import { Alert, Box, Container, Stack } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { api } from "../apis";
import ImageSlider from "../components/atoms/ImageSlider";
import FeedbackCard from "../components/molecules/FeedbackCard";
import MenteeCard from "../components/molecules/MenteeCard";
import ProgramCard from "../components/molecules/ProgramCard";
import SectionTitle from "../components/molecules/SectionTitle";
import SkillSet from "../components/molecules/SkillSet";
import UserInformation from "../components/organisms/UserInformation";
import { CommentContext } from "../contexts/CommentProvider";
import { FeedbackContext } from "../contexts/FeedbackProvider";
import { ProductContext } from "../contexts/ProductProvider";
import { dummyFeedbacks } from "../utils/tools";

const imageList = [
  "/assets/slides/slide1.png",
  "/assets/slides/slide2.png",
  "/assets/slides/slide3.png",
];

const tooltips = {
  programs:
    '멘티스 사용자가 게시한 프로그램 목록입니다. 더 많은 프로그램을 보시려면 "더 보기"를 클릭하세요.',
  risingMentee: "추천을 많이 받은 멘티 목록입니다.",
  feedback:
    "멘티들의 상호간에 이루어지는 질의응답 컨텐츠입니다. 여러분의 이야기를 공유 하세요! 😎",
};

function Home() {
  const [userList, setUserList] = useState([]);
  const products = useContext(ProductContext);
  const feedbacks = useContext(FeedbackContext);
  const comments = useContext(CommentContext);
  const productList = useMemo(
    () =>
      products.length > 0 ? (
        products.map((contents, idx) => (
          <ProgramCard key={idx} contents={contents} idx={idx} />
        ))
      ) : (
        <Alert severity='warning' sx={{ flex: 1 }}>
          등록된 상품이 없습니다.
        </Alert>
      ),
    [products]
  );
  const feedbackList = useMemo(
    () =>
      feedbacks.length > 0 ? (
        feedbacks.map((contents, idx) => (
          <FeedbackCard
            key={idx}
            contents={contents}
            idx={idx}
            comments={comments.filter(
              (comment) => comment.pnum === contents.num
            )}
          />
        ))
      ) : (
        <Alert severity='warning' sx={{ flex: 1 }}>
          등록된 피드백이 없습니다.
        </Alert>
      ),
    [feedbacks]
  );

  useEffect(() => {
    api.members.findAll().then((result) => {
      setUserList(result.data.payload);
    });
  }, []);

  return (
    <Stack
      component='main'
      sx={{
        gap: 10,
      }}>
      <Container>
        {/* Section 01 - slide */}
        <ImageSlider autoPlay images={imageList} />
      </Container>

      <Stack component={Container} maxWidth={"lg"} sx={{ gap: 10 }}>
        {/* User information */}
        <Box>
          <UserInformation />
        </Box>

        {/* Section 02 - mentees programs */}
        <Box>
          <SectionTitle
            title={"Mentees 프로그램"}
            more={"/mentees"}
            tooltip={tooltips.programs}
          />
          {/* Program Cards */}
          <Stack sx={{ mt: 3, gap: 5 }}>{productList}</Stack>
        </Box>

        {/* Section 03 - hot mentee */}
        <Box>
          <SectionTitle
            title={"지금 뜨는 멘티"}
            tooltip={tooltips.risingMentee}
          />
          {/* Program Cards */}
          <Stack sx={{ mt: 3, gap: 2 }}>
            {userList.map((u, idx) => (
              <MenteeCard key={idx} user={u} />
            ))}
          </Stack>
        </Box>

        {/* Section 04 - recommend feedback */}
        <Box>
          <SectionTitle
            title={"추천 피드백"}
            more={"/mentees/feedback"}
            tooltip={tooltips.feedback}
          />
          {/* Program Cards */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            flexWrap='wrap'
            justifyContent='flex-start'
            sx={{ mt: 3, gap: { xs: 5, md: 2 } }}>
            {feedbackList}
          </Stack>
        </Box>

        {/* Section 05 - skillset */}
        <Box>
          <SkillSet />
        </Box>
      </Stack>
    </Stack>
  );
}

export default Home;
