import ErrorMessage from "../errorMessage/ErrorMessage";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <Helmet>
        <meta name="description" content="This page is not found" />
        <title>This page is not found</title>
      </Helmet>
      <ErrorMessage />
      <p
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          marginTop: "25px",
        }}
      >
        Page doesn't exist
      </p>
      <Link
        style={{
          display: "block",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          marginTop: "30px",
          color: "#9f0013",
        }}
        to="/"
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
