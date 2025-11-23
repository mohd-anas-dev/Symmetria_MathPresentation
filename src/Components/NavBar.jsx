import React from 'react'
import "../ComponentStyling/NavBar.css"
import Image from "./ChatGPT Image Nov 23, 2025, 03_12_23 PM.png"
import { NavLink } from 'react-router-dom'
const NavBar = () => {
  return (
    <>
    <div className="NavBar">
        <div className="NavBarContainer">
            <div className="LeftNavbar">
                <img src={Image} alt="" />
            </div>
            {/* <div className="MiddleNavBar">
                <ul>
                    <li><NavLink to="/grouptheory" className="top-word">Group Theory</NavLink></li>
                    <li><NavLink to="/combinatorics">Combinatorics</NavLink></li>
                    <li><NavLink to="/graphtheory">Graph Theory</NavLink></li>
                    <li><NavLink to="z7group">Z₇ Group</NavLink></li>
                </ul>
            </div> */}
            <div className="MiddleNavBar">
    <ul>
        <li>
            <NavLink to="/grouptheory" data-text="Group Theory">
                <span>Group Theory</span>
            </NavLink>
        </li>
        <li>
            <NavLink to="/combinatorics" data-text="Combinatorics">
                <span>Combinatorics</span>
            </NavLink>
        </li>
        <li>
            <NavLink to="/graphtheory" data-text="Graph Theory">
                <span>Graph Theory</span>
            </NavLink>
        </li>
        <li>
            <NavLink to="/z7group" data-text="Z₇ Group">
                <span>Z₇ Group</span>
            </NavLink>
        </li>
    </ul>
</div>
            <div className="RightNavBar">
                <ul>
                    <li><NavLink className={({ isActive}) => isActive ? "Clicked active" : "Clicked"} to="/"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></svg>HOME</NavLink></li>
                    {/* <li><NavLink className={({ isActive}) => isActive ? "Clicked active" : "Clicked"}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-corner-down-right-icon lucide-corner-down-right"><path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></svg>TEAM</NavLink></li> */}
                </ul>
            </div>
        </div>
    </div>
    </>
  )
}

export default NavBar
