import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProcessTest from "./pages/ProcessTest";
import Layout from "./pages/Layout";
import Reader from "./pages/Reader";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="process" element={<ProcessTest />} />
          <Route path="reader" element={<Reader />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
