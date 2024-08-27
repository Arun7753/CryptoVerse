import { useState } from "react";

const Navbar = () => {

  const Menu = [
    { name: "Home", path: "/" },
    { name: "All Coin", path: "/" },
    { name: "Trending Coin", path: "/" },
    { name: "About", path: "/" }
  ];

  let [open, setOpen] = useState(false);

  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
        <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
          CryptoVerse
        </div>

        <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
          <i className={open ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'}`}>          {
          Menu.map((item) => (
            <li key={item.name} className='md:ml-8 text-xl md:my-0 my-7'>
              <a href={item.path} className='text-gray-800 hover:text-gray-400 duration-500'>{item.name}</a>
            </li>
          ))
        }
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
