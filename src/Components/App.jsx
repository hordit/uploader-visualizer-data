import FileUploader from "./FileUploader";
import GlobalStyle from "./GlobalStyles";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const App = () => {

  const handleDataLoad = (data) => {
    console.log("Data loaded in App component:", data);
  };
  
  return (
    <>
      <FileUploader onDataLoad={handleDataLoad} />
      <GlobalStyle />
      <ToastContainer />
    </>
  );
};

export default App;
