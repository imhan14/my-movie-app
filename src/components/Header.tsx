import React, { useEffect, useState } from "react";
import logo from "../assets/movie-logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../contants/navigations";

const Header = () => {
  const location = useLocation();
  // const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  const [searchInput, setSearchInput] = useState(location.search.slice(3));
  const navigate = useNavigate();
  // console.log("ft", removeSpace);
  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <header className="fixed top-0 w-full h-16 bg-neutral-600/50 z-40">
      <div className="container mx-auto px-2 flex items-center h-full">
        <Link to={"/"}>
          <img src={logo} alt="logo" width={120} />
        </Link>
        <nav className="hidden lg:flex items-center gap-1 ml-5">
          {navigation.map((nav) => {
            return (
              <div key={nav.label}>
                <NavLink
                  key={nav.label}
                  to={nav.href}
                  className={({ isActive }) =>
                    `px-3 hover:text-neutral-100 ${
                      isActive && "text-neutral-100"
                    }`
                  }
                >
                  {nav.label}
                </NavLink>
              </div>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="text-2xl text-white">
              <IoSearchOutline className="cursor-pointer" />
            </button>
          </form>

          <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all">
            <img src={userIcon} width="w-10 h-10" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
