
import React, { useEffect, useRef } from 'react';
import '../styles/Move.css';

const Move = () => {
  const moveRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  const circle3Ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });

    if (moveRef.current) observer.observe(moveRef.current);
    if (circle1Ref.current) observer.observe(circle1Ref.current);
    if (circle2Ref.current) observer.observe(circle2Ref.current);
    if (circle3Ref.current) observer.observe(circle3Ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className='move-section h-[40vh] relative overflow-hidden' ref={moveRef}>
      <div 
        ref={circle1Ref}
        className='move-circle1 size-[18vw] bg-blue-500 rounded-br-full rounded-tr-full absolute blur-2xl top-[75%] z-10'
      ></div>
      <div 
        ref={circle2Ref}
        className='move-circle2 size-[15vw] bg-blue-500 rounded-br-full rounded-tr-full absolute blur-2xl top-[65%] z-10'
      ></div>
      <div 
        ref={circle3Ref}
        className='move-circle3 size-[18vw] bg-blue-500 rounded-br-full rounded-tr-full absolute blur-2xl top-[75%] z-10'
      ></div>
    </div>
  );
};

export default Move;