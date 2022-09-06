import { Alert, Box, Container, Stack } from "@mui/material";
import React, { useContext, useMemo } from "react";
import ImageSlider from "../components/atoms/ImageSlider";
import FeedbackCard from "../components/molecules/FeedbackCard";
import MenteeCard from "../components/molecules/MenteeCard";
import ProgramCard from "../components/molecules/ProgramCard";
import SectionTitle from "../components/molecules/SectionTitle";
import SkillSet from "../components/molecules/SkillSet";
import UserInformation from "../components/organisms/UserInformation";
import { ProductContext } from "../contexts/ProductProvider";
import { dummyFeedbacks } from "../utils/tools";

const imageList = [
  "http://localhost:8050/resources/img/cover/ab01.jpg",
  "http://localhost:8050/resources/img/cover/ab02.jpg",
];

function Home() {
  const products = useContext(ProductContext);
  const productList = useMemo(
    () =>
      products.map((contents, idx) => (
        <ProgramCard key={idx} contents={contents} idx={idx} />
      )),
    [products]
  );

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
          <SectionTitle title={"Mentees 프로그램"} more={"/mentees/programs"} />
          {/* Program Cards */}
          <Stack sx={{ mt: 3, gap: 5 }}>
            {products.length === 0 && (
              <Alert severity='warning'>등록된 상품이 없습니다.</Alert>
            )}
            {productList}
          </Stack>
        </Box>

        {/* Section 03 - hot mentee */}
        <Box>
          <SectionTitle title={"지금 뜨는 멘티"} />
          {/* Program Cards */}
          <Stack sx={{ mt: 3 }}>
            <MenteeCard />
          </Stack>
        </Box>

        {/* Section 04 - recommend feedback */}
        <Box>
          <SectionTitle title={"추천 피드백"} more={"/mentees/feedback"} />
          {/* Program Cards */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            flexWrap='wrap'
            justifyContent='flex-start'
            sx={{ mt: 3, gap: { xs: 5, md: 2 } }}>
            {dummyFeedbacks.map((item, idx) => (
              <FeedbackCard key={idx} contents={item} idx={idx} />
            ))}
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
