import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import roles from "../app/api/roles/roles";

const withAuthorization = (Component, requiredRole) => {
  return (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    if (!session) {
      router.push("/signin");
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

export default withAuthorization;
