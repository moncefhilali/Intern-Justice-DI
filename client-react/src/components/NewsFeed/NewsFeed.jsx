import React from "react";
import ImageSlider from "../ImageSlider/ImageSlider";

const NewsFeed = () => {
  const slides = [
    { url: "http://localhost:3000/slide1.jpg", title: "Slide 1" },
    { url: "http://localhost:3000/slide2.jpg", title: "Slide 2" },
    { url: "http://localhost:3000/slide3.jpg", title: "Slide 3" },
    { url: "http://localhost:3000/slide4.jpg", title: "Slide 4" },
  ];

  const containerStyles = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };

  return (
    <div>
      <div className="header">
        <h1>ACCUEIL</h1>
      </div>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};

export default NewsFeed;
