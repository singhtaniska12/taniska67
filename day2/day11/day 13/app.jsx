import React, { useState } from "react";
import "./App.css";

function App() {
  const images = [
    "https://picsum.photos/id/1015/1200/800",
    "https://picsum.photos/id/1018/1200/800",
    "https://picsum.photos/id/1025/1200/800",
    "https://picsum.photos/id/1035/1200/800",
  ]; 

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
 
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="slider-container">
      <div className="image-container">
        <img 
          src={images[currentIndex]} 
          alt={`Slide ${currentIndex + 1}`} 
          className="slider-image"
        />
      </div>
      <div className="button-container">
        <button onClick={handlePrevClick} className="nav-btn">Previous</button>
        <button onClick={handleNextClick} className="nav-btn">Next</button>
      </div>
    </div>
  );
}

export default App;