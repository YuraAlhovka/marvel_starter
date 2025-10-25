import img from "./error_1.gif";

const ErrorMessage = () => {
  return (
    <img
      style={{
        display: "block",
        height: "250px",
        width: "250px",
        objectFit: "contain",
        margin: "0 auto",
      }}
      src={img}
      alt="Error"
    />
  );
};

export default ErrorMessage;
