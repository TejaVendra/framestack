
import React from 'react';

const CardSer = ({ title, link }) => {
  return (
    <div className='group overflow-hidden rounded-xl bg-gray-900 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 h-full'>
      <div className='relative overflow-hidden'>
        <img 
          src={link} 
          alt={title} 
          className='w-full h-72 md:h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-110'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      </div>
      <p className='font-para mt-4 text-lg md:text-xl lg:text-2xl mix-blend-difference text-center px-2 pb-4'>
        {title}
      </p>
    </div>
  );
};

export default CardSer;