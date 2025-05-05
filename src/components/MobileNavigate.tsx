import { mobileNavigation } from "../contants/navigations";
import { NavLink } from "react-router-dom";
const MobileNavigate = () => {
  return (
    <section className="lg:hidden h-14 bg-black/60 backdrop-blur-2xl fixed bottom-0 w-full z-40">
      <div className="flex items-center justify-between h-full text-neutral-400">
        {mobileNavigation.map((nav) => {
          return (
            <NavLink
              key={nav.label + "mobileNavigation"}
              to={nav.href}
              className={({ isActive }) =>
                `px-3 flex h-full items-center flex-col justify-center ${
                  isActive && `text-white`
                }`
              }
            >
              <div className="text-2xl">{nav.icon}</div>
              <p className="text-sm">{nav.label}</p>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default MobileNavigate;
