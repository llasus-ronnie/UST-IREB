import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import "../app/styles/unauthorized/unauthorized.css";

const AuthorizationWrapper = ({ children, requiredRoles }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const userRole = session?.user?.role;
      if (!userRole || !requiredRoles.includes(userRole)) {
        router.replace(requiredRoles.includes("REC") ? "../../Unauthorized" : "../Unauthorized");
      }
    } else if (status === "unauthenticated") {
      router.replace("../SignInOption");
    }
  }, [status, session, requiredRoles, router]);

  if (status === "loading") {
    return (
      <div style={loadingContainerStyle}>
        <Spinner animation="border" role="status" style={spinnerStyle}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p style={loadingTextStyle}>
          Please wait, we are verifying your access...
        </p>
      </div>
    );
  }

  return children;
};

const withAuthorization = (Component, requiredRoles) => {
  return function WrappedComponent(props) {
    return (
      <AuthorizationWrapper requiredRoles={requiredRoles}>
        <Component {...props} />
      </AuthorizationWrapper>
    );
  };
};

const loadingContainerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "var(--secondary-color)",
};
const spinnerStyle = {
  width: "4rem",
  height: "4rem",
  color: "var(--tertiary-color)",
};
const loadingTextStyle = {
  fontFamily: "var(--poppins)",
  fontSize: "var(--paragraph-size)",
  color: "var(--primary-color)",
  marginTop: "1rem",
};

export default withAuthorization;