import React from 'react'

const Serve = ({ bg, col, title, para, link }) => {
  return (
    <div className='flex gap-6 items-center p-6  justify-around pt-[5rem] pb-[50rem]' style={{ backgroundColor: bg }}>
      <div className='flex flex-col max-w-[60%] h-[100%] justify-around'>
        <h1 className='font-bold text-5xl font-heading' style={{ color: col }}>
          {title}
        </h1>
        <p className='mt-2 text-2xl' style={{ color: "white" }}>
          {para}
        </p>
      </div>
      <img src={link} alt={title} className='h-[40vh] w-[30vw] object-cover rounded-lg' />
    </div>
  )
}

export default Serve
