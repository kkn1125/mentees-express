import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  IndexRouteProps,
  LayoutRouteProps,
  Navigate,
  PathRouteProps,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import Layout from "./components/templates/Layout";
import { UserContext } from "./contexts/UserProvider";
import useSnack from "./hooks/useSnack";
import About from "./pages/About";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home";
import Detail from "./pages/Mentees/Detail";
import Feedback from "./pages/Mentees/Feedback";
import FeedbackDetail from "./pages/Mentees/FeedbackDetail";
import Profile from "./pages/Mentees/Profile";
import Programs from "./pages/Mentees/Programs";
import WriteForm from "./pages/Mentees/WriteForm";
import NotFound from "./pages/NotFound";

const ProtectedRoute = ({ children }) => {
  const params = useParams();
  const { warningSnack } = useSnack();
  const users = useContext(UserContext);
  const [cookies] = useCookies(["token"]);
  const hasToken = Object.keys(cookies.token || {}).length !== 0;
  const [protect, setProtect] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (params.num !== undefined && isNaN(Number(params.num))) {
      setError(true);
    } else if (!users.num || !hasToken) {
      setProtect(true);
      warningSnack("로그인을 해야 접근 가능합니다.");
    }
  }, [users.num]);

  if (protect) {
    return <Navigate to='/' replace />;
  } else if (error) {
    return <NotFound />;
  }

  return <>{children}</>;
};

const AuthProtectedRoute = ({ children }) => {
  const params = useParams();
  const { warningSnack } = useSnack();
  const users = useContext(UserContext);
  const [cookies] = useCookies(["token"]);
  const hasToken = Object.keys(cookies.token || {}).length !== 0;
  const [protect, setProtect] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (params.num !== undefined && isNaN(Number(params.num))) {
      setError(true);
    } else if (users.num && hasToken) {
      setProtect(false);
      warningSnack("로그인 된 상태에서 접근 할 수 없습니다.");
    }
  }, [users.num]);

  if (!protect) {
    return <Navigate to='/' replace />;
  } else if (error) {
    return <NotFound />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='mentees'>
          <Route index element={<Programs />} />
          <Route
            path='profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path='feedback' element={<Feedback />} />
          <Route path='feedback/:num' element={<FeedbackDetail />} />
          <Route path=':num' element={<Detail />} />
          <Route
            path='form'
            element={
              <ProtectedRoute>
                <WriteForm />
              </ProtectedRoute>
            }
          />
          <Route
            path='form/:num'
            element={
              <ProtectedRoute>
                <WriteForm mode='update' />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path='auth'>
          <Route
            path='signin'
            element={
              <AuthProtectedRoute>
                <Signin />
              </AuthProtectedRoute>
            }
          />
          <Route
            path='signup'
            element={
              <AuthProtectedRoute>
                <Signup />
              </AuthProtectedRoute>
            }
          />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

// https://velog.io/@drata313/AOS aos react 사용법
