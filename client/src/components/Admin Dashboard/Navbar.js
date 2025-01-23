import React from "react";

import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = ({ setUser, user }) => {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        window.location = "/log-in";
      }
    });
  }

  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/admin">Admin Dashboard</NavLink>
          {/* <NavLink to="/admin"></NavLink> */}
          {/* <NavLink to="/contact">Contact Us</NavLink> */}

          {user ? (
            <>
              <NavLink to="/blog">Blog</NavLink>
            </>
          ) : (
            <></>
          )}
        </NavMenu>

        <NavBtn>
          {user ? (
            <>
              <NavBtnLink
                to="/logout"
                className="btn btn-primary btn-sm active"
                onClick={() => handleLogoutClick()}
              >
                Logout
              </NavBtnLink>
            </>
          ) : (
            <>
              <NavBtnLink to="/login" className="btn btn-primary btn-sm active">
                Login
              </NavBtnLink>
              <NavBtnLink
                to="/signup"
                className="btn btn-primary btn-sm active"
              >
                Sign Up
              </NavBtnLink>
            </>
          )}
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;