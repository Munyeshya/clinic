import React from 'react'
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Departments from "../components/Departments";
import Team from "../components/Team";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const WebPage = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <About />
        <Departments />
        <Team />
        <Contact />
        <Footer />

    </div>
  )
}

export default WebPage