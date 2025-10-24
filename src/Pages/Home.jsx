
import React, { useEffect } from 'react';
import Nav from '../Components/Nav';
import Hero from '../Sections/Hero';
import Cursor from '../Sections/Cursor';
import Portfolio from '../Sections/Portfolio';
import Services from '../Sections/Services';
import Copywright from '../Components/Copywright';
import initHeroAnimations from '../Components/heroAnimations';
import initPortfolioAnimations from '../Components/portfolioAnimations';
import FAQ from '../Sections/FAQ';
import Testimonials from '../Sections/Testimonials';

const Home = () => {
  useEffect(() => {
    // Initialize animations
    initHeroAnimations();
    initPortfolioAnimations();
    // Move and Services animations are initialized within their components
  }, []);

  return (
    <>
      <Nav></Nav>
      <Hero></Hero>
      <Cursor></Cursor>
      <Portfolio></Portfolio>
      <Services></Services>
      <Testimonials></Testimonials>
      <FAQ></FAQ>
      <Copywright></Copywright>
    </>

  );
};

export default Home;