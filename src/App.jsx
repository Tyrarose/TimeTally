import React, { useState } from "react";
import Calculator from "./pages/Calculator";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);

  const handleThemeChange = (event) => {
    setIsDarkMode(event.target.checked);
  };

  const updateTotalTime = (hours, minutes) => {
    setTotalHours(hours);
    setTotalMinutes(minutes);
  };

  return (
    <>
      <Header
        isDarkMode={isDarkMode}
        handleThemeChange={handleThemeChange}
        totalHours={totalHours}
        totalMinutes={totalMinutes}
      />
      <Calculator 
        isDarkMode={isDarkMode} 
        updateTotalTime={updateTotalTime} 
      />
      <Footer />
    </>
  );
};

export default App;
