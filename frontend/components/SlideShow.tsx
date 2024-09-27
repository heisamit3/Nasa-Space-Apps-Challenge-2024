import React, { useState, useEffect } from 'react';
import '../css/SlideShow.css';
import image1 from "../images/Slider1.jpg";
import image2 from "../images/Slider2.jpg";
import image3 from "../images/Slider3.jpg";
import image4 from "../images/Slider4.jpg";
import image5 from "../images/Slider5.jpg";
import image6 from "../images/Slider6.jpg";
import image7 from "../images/Slider7.jpg";

const slides = [
    {
        image: image1,
        text: "Our Planet is Crying for Help.",
    },
    {
        image: image2,
        text: "We Can’t Afford to Ignore Climate Change.",
    },
    {
        image: image3,
        text: "The Earth is Warming, and So Are Our Consequences.",
    },
    {
        image: image4,
        text: "Natural Disasters Are on the Rise.",
    },
    {
        image: image5,
        text: "Together, We Can Make a Difference.",
    },
    {
        image: image6,
        text: "Protect Our Planet for Future Generations.",
    },
    {
        image: image7,
        text: "Act Now for a Greener Tomorrow!",
    },
];

const SlideShow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000); // Automatically change slide every 3 seconds
      return () => clearInterval(interval); // Clear interval on component unmount
    }, [currentSlide]);
  
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    };
  
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };
  
    return (
      <div className="slideshow-container">
        <div className="slide">
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].text}
            style={{ width: "80%", height: "auto" }}
          />
          <div className="text">{slides[currentSlide].text}</div>
        </div>
        <div className="navigation">
          <span className="prev" onClick={prevSlide}>
            &lt;
          </span>
          <span className="next" onClick={nextSlide}>
            &gt;
          </span>
        </div>
      </div>
    );
  };
  
  export default SlideShow;