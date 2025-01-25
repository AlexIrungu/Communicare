import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/aunthentication/Login";
import Signup from "./components/aunthentication/Signup";
import Blog from "./components/Blog";
import Navbar from "./components/Admin Dashboard/Navbar";
import Donation from "./components/Donation";
import About from "./components/About/About";
import Contact from "./components/Contacts/ContactForm";
import Map from "./components/Map";
import LandingPage from "./components/Landing/LandingPage";
import DiseasesList from "./components/Diseases/Diseases";
import Areas from "./components/Areas/Area";
import AreaDetails from "./components/Areas/AreaDetails";
import Donate from "./components/Diseases/Donate";
import Testimonial from "./components/Diseases/Testimonial";
import MedicinePage from "./components/Diseases/MedicinePage";
import AreaTable from "./components/Admin Dashboard/AreaTable";
import Dashboard from "./components/Admin Dashboard/Admin";

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar setUser={setUser} user={user} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home user={user} />} />
          <Route path="/about" element={<About user={user} />} />
          <Route path="/blog" element={<Blog user={user} />} />
          <Route path="/donation" element={<Donation user={user} />} />
          <Route path="/contacts" element={<Contact user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/map" element={<Map user={user} />} />
          <Route path="/diseases" element={<DiseasesList user={user} />} />
          <Route path="/areas" element={<Areas user={user} />} />
          <Route path="/areadetails" element={<AreaDetails user={user} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/donated" element={<Donate user={user} />} />
          <Route path="/testimonial" element={<Testimonial user={user} />} />
          <Route path="/medicine" element={<MedicinePage user={user} />} />
          <Route path="/area" element={<AreaTable user={user} />} />
          <Route path="/admin" element={<Dashboard user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
