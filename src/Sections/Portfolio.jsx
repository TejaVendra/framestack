import React from 'react';
import CardSer from '../Components/CardSer';
import '../styles/Portfolio.css'; // Import the CSS file

const Portfolio = () => {
  return (
 <section className='portfolio-section px-4 sm:px-6 md:px-10 lg:px-[5rem] py-8'>
     <div className="portfolio-heading text-center mb-8"> {/* added mb-8 for spacing */}
        <h2 className="heading-line heading-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
          Turn your ideas into impactful
        </h2>
        <h2 className="heading-line heading-right text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-2">
          solutions like them!
        </h2>
      </div>

      <div className='portfolio-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8'>
        <div className='portfolio-card-item'>
          <CardSer 
            title="Tournament-Sport management app" 
            link="./src/assets/sport.webp" 
          />
        </div>
        <div className='portfolio-card-item'>
          <CardSer 
            title="UX for Crypto Trading platform" 
            link="./src/assets/Crypto.jpg" 
          />
        </div>
        <div className='portfolio-card-item'>
          <CardSer 
            title="Modern fashion web design app" 
            link="./src/assets/beclothing.jpg" 
          />
        </div>
        <div className='portfolio-card-item'>
          <CardSer 
            title="UX for Crypto Trading platform" 
            link="./src/assets/kaniro.jpg" 
          />
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
