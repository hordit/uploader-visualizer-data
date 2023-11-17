import FileUploader from "./FileUploader";
import GlobalStyle from "./GlobalStyles";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <FileUploader />
      <GlobalStyle />
      <ToastContainer />
    </>
  );
};

export default App;
