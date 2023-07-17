import React from "react";
import ImageSlider from "../ImageSlider/ImageSlider";

const NewsFeed = () => {
  const slides = [
    {
      url: "http://localhost:3000/slide1.jpg",
      title:
        "Le ministre de la Justice tient une réunion bilatérale avec le président de la Cour suprême de cassation et de justice de Roumanie.",
      href: "https://justice.gov.ma/2023/07/12/%d9%88%d8%b2%d9%8a%d8%b1-%d8%a7%d9%84%d8%b9%d8%af%d9%84-%d9%8a%d8%b9%d9%82%d8%af-%d9%84%d9%82%d8%a7%d8%a1%d9%8b-%d8%ab%d9%86%d8%a7%d8%a6%d9%8a%d8%a7%d9%8b-%d9%85%d8%b9-%d8%b1%d8%a6%d9%8a%d8%b3%d8%a9/",
    },
    {
      url: "http://localhost:3000/slide2.jpg",
      title:
        "Le ministre de la Justice tient une réunion de travail avec son homologue roumain et ils signent un protocole de coopération dans le domaine judiciaire.",
      href: "https://justice.gov.ma/2023/07/12/%d9%88%d8%b2%d9%8a%d8%b1-%d8%a7%d9%84%d8%b9%d8%af%d9%84-%d9%8a%d8%b9%d9%82%d8%af-%d9%84%d9%82%d8%a7%d8%a1-%d8%b9%d9%85%d9%84-%d9%85%d8%b9-%d9%86%d8%b8%d9%8a%d8%b1%d8%aa%d9%87-%d8%a7%d9%84%d8%b1%d9%88/",
    },
    {
      url: "http://localhost:3000/slide3.jpg",
      title:
        "Le Secrétaire Général, au nom du Ministre de la Justice, a inauguré deux stages de formation pour dames et messieurs au centre de formation « Technopolis » à Salé.",
      href: "https://justice.gov.ma/2023/06/28/%d8%a8%d9%80%d9%84%d8%a7%d8%ba-%d8%b5%d8%ad%d9%81%d9%8a/",
    },
    {
      url: "http://localhost:3000/slide4.jpg",
      title:
        "Le Ministre de la Justice passe en revue, lors d'une réunion avec l'ISESCO, les approches et politiques réussies adoptées par le Royaume pour lutter contre le terrorisme.",
      href: "https://justice.gov.ma/2023/06/28/%d8%a8%d9%80%d9%84%d8%a7%d8%ba-%d8%b5%d8%ad%d9%81%d9%8a/",
    },
  ];

  const containerStyles = {
    width: "100%",
    height: "440px",
    margin: "0 auto",
    paddingLeft: "7rem",
    paddingRight: "7rem",
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
