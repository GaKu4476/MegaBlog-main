import React from 'react'
import megablog from '../assets/megablog.png'

function Logo({width = '50px'}) {
  return (
    <div className={`md:w-${width}`}>
      <h3 className='hidden md:inline font-semibold md:font-bold text-sm md:text-base text-black dark:text-white'>
        Metalog 🔥
      </h3>
      <h3 className='md:hidden font-bold text-sm text-black dark:text-white'>
        🔥
      </h3>
      {/* <img src={megablog} alt="" srcset="" width="10"/> */}
    </div>
  )
}

export default Logo
