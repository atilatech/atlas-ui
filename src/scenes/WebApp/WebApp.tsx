import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Register from "../../components/RegisterLogin/Register";
import Atlas from "../Atlas/Atlas";
export default function WebApp() {
  return (
    <div>
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="register" element={<Register />} />
            <Route path="/" element={<Atlas />}>
            </Route>
        </Routes>
        <Footer />
    </BrowserRouter>
    </div>
  );
}