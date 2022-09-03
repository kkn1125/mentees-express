import { Box, Container, Stack } from "@mui/material";
import React from "react";
import FeedbackCard from "../components/molecules/FeedbackCard";
import MenteeCard from "../components/molecules/MenteeCard";
import ProgramCard from "../components/molecules/ProgramCard";
import SectionTitle from "../components/molecules/SectionTitle";
import SkillSet from "../components/molecules/SkillSet";
import UserInformation from "../components/organisms/UserInformation";
import { dummyFeedbacks, dummyProducts } from "../utils/tools";

function Home() {
  return (
    <Stack
      component='main'
      sx={{
        gap: 10,
      }}>
      <Box>
        {/* Section 01 - slide */}
        <Box
          sx={{
            height: 400,
          }}>
          <Box
            component='img'
            src='http://localhost:8050/resources/img/cover/ab01.jpg'
            alt='sample'
            sx={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      </Box>

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
            {dummyProducts.map((contents, idx) => (
              <ProgramCard key={idx} contents={contents} idx={idx} />
            ))}
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
