import { useNavigate } from "react-router-dom";
import { ButtonPrimary, ButtonOutlinePrimary } from "./Buttons";
import ToggleTheme from "./ToggleTheme";
import { useAuth } from "../Contexts/AuthContext";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-950 border-b-1 border-b-gray-200 dark:border-b-gray-800 px-3 sticky top-0 z-50 h-[70px]">
      <div className="flex items-center justify-between gap-4 h-full">
        <div className="logo">
          <h1 className="text-3xl font-bold text-blue-600 uppercase">Blog</h1>
        </div>
        <div className="flex items-center gap-2">
          <ToggleTheme />
          {
            !isLoggedIn ? (
              <>
                <ButtonOutlinePrimary onClick={() => navigate("/login")}>Login</ButtonOutlinePrimary>
                <ButtonPrimary onClick={() => navigate("/register")}>Register</ButtonPrimary>
              </>
            ) : (
              <>
              <div className="">
                <Menu>
                  <MenuButton className="flex items-center gap-1 py-2 rounded-xl cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    { user && user.name }
                  </MenuButton>

                  <MenuItems
                    transition
                    anchor="bottom end"
                    modal={ false }
                    className="w-52 origin-top-right rounded-xl border border-gray-200 dark:border-gray-700/50 bg-gray-300/5 dark:bg-gray-700/30 p-1 text-sm/6 dark:text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 z-50"
                  >
                    <MenuItem>
                      <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-gray-600/10 text-gray-900 dark:text-white dark:data-focus:bg-gray-600/40 cursor-pointer">
                        Profile (Soon)
                        <kbd className="ml-auto hidden font-sans text-xs dark:text-white/50 group-data-focus:inline">⌘P</kbd>
                      </button>
                    </MenuItem>
                    <div className="my-1 h-px bg-gray-200 dark:bg-gray-700/50" />
                    <MenuItem>
                      <button onClick={ logout } className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-gray-600/10 text-gray-900 dark:text-white dark:data-focus:bg-gray-600/40 cursor-pointer">
                        Logout
                        <kbd className="ml-auto hidden font-sans text-xs dark:text-white/50 group-data-focus:inline">⌘L</kbd>
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
              </>
            )
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
