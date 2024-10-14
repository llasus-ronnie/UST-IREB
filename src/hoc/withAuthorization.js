import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import roles from "../app/api/roles/roles";
import { Spinner } from "react-bootstrap"; // If using React-Bootstrap for a spinner

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

    if (!session) {
      router.push("../SignInOption");
      return null;
    }

    const userRole = session.user.role; // Assuming role is stored in session

    if (userRole !== requiredRole) {
      router.push("../Unauthorized");
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
