import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Layout from "./components/templates/Layout";
import NotFound from "./pages/NotFound";
import Programs from "./pages/Mentees/Programs";
import Feedback from "./pages/Mentees/Feedback";
import Detail from "./pages/Mentees/Detail";
import FeedbackDetail from "./pages/Mentees/FeedbackDetail";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='mentees'>
          <Route index element={<Programs />} />
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
