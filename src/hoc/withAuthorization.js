import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Spinner } from "react-bootstrap";
import "../app/styles/unauthorized/unauthorized.css";

const withAuthorization = (Component, requiredRole) => {
  return (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

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

    if (status === "unauthenticated" || !session) {
      router.push("../SignInOption");
      return null;
    }

    const userRole = session.user.role;
    if (userRole !== requiredRole) {
      if (requiredRole === "REC") {
        router.push("../../Unauthorized");
      } else {
        router.push("../Unauthorized");
      }
      return null;
    }

    return <Component {...props} />;
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
