import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyLib from "./components/myLib/MyLib";


function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<MyLib/>}
    />
  </Routes>
  </BrowserRouter>
  );
}

export default App;
