import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/templates/Layout";
import About from "./pages/About";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home";
import Detail from "./pages/Mentees/Detail";
import Feedback from "./pages/Mentees/Feedback";
import FeedbackDetail from "./pages/Mentees/FeedbackDetail";
import Profile from "./pages/Mentees/Profile";
import Programs from "./pages/Mentees/Programs";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='mentees'>
          <Route index element={<Programs />} />
          <Route path='profile' element={<Profile />} />
          <Route path='feedback' element={<Feedback />} />
          <Route path='feedback/:num' element={<FeedbackDetail />} />
          <Route path=':num' element={<Detail />} />
        </Route>
        <Route path='auth'>
          <Route path='signin' element={<Signin />} />
          <Route path='signup' element={<Signup />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

// https://velog.io/@drata313/AOS aos react 사용법
