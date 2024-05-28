import React from 'react'
import { ModeToggle } from './toggle-theme'

const NavBar = () => {
  return (
    <nav className='sticky top-0 backdrop-blur p-4 flex justify-between px-32'>
        <div className='p-2'>
            <h2 className='text-3xl'>IRCTC BOOKING</h2>
        </div>
        <ModeToggle />
    </nav>
  )
}

export default NavBar