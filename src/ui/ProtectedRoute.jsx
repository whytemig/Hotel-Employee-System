import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* eslint-disable react/prop-types */
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load the auth user
  const { isLoading, isAuth } = useUser();

  // navigate doesnt
  useEffect(() => {
    if (!isAuth && !isLoading) navigate("/login");
  }, [isAuth, navigate, isLoading]);
  // 2.if not auth then redirect to login page
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );
  }

  // 3.if auth render to the app
  if (isAuth) return children;
}

export default ProtectedRoute;
