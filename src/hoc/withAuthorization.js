import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import roles from "../app/api/roles/roles";
import { Row, Col } from "react-bootstrap"; // If using React-Bootstrap for a spinner
import "../app/styles/unauthorized/unauthorized.css";

const withAuthorization = (Component, requiredRole) => {
  return (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
      return (
        <div className="unauthorized-container">
          <div className="unauthorized-content">
            <Row>
              <Col className="unauthorized-image">
                <img
                  src="../images/unauthorized/401.gif"
                  alt="Unauthorized Access"
                />
              </Col>
              <Col className="unauthorized-details">
                <h1 className="unauthorized-title">
                  Unauthorized Access Error
                </h1>
                <p className="unauthorized-message">
                  You do not have permission to view this page.
                </p>
                <div className="unauthorized-button">
                  <a href="/" className="unauthorized-link">
                    Go back to Home
                  </a>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      );
    }

    if (!session) {
      router.push("../SignInOption");
      return null;
    }

    const userRole = session.user.role;
    if (userRole !== requiredRole) {
      router.push("../Unauthorized");
      return null;
    }

    return <Component {...props} />;
  };
};

export default withAuthorization;
