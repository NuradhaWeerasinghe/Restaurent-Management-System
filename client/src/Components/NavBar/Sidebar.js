import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import {BiUserCircle} from "react-icons/bi"


const Nav = styled.div`
// margin-top : 0px;
// background: #15171c; //side bar color
background: rgb(12, 0, 0);
height: 90px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const NavIcon = styled(Link)`
margin-left: 2rem;
font-size: 2rem;
height: 80px;
display: flex;
justify-content: flex-start;
align-items: center;
`;

const SidebarNav = styled.nav`
background: rgb(12, 0, 0);
width: 275px;
height: 100vh;
display: flex;
justify-content: center;
position: fixed;
top: 0;
left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
transition: 350ms;
z-index: 10;
`;

const SidebarWrap = styled.div`
width: 100%;
`;

const Sidebar = () => {
const [sidebar, setSidebar] = useState(false);

const showSidebar = () => setSidebar(!sidebar);

return (
	<>
	<IconContext.Provider value={{ color: "#fff" }}>
		<Nav>
      
		<NavIcon to="#">
			<FaIcons.FaBars onClick={showSidebar} />
			
		</NavIcon>
		<h1
			style={{ textAlign: "center",
					marginLeft: "32%",
					color: "#b78c33",
					fontFamily:"Sofia"
				
				}}
		>
			High Garden Resturant 🍽️
		</h1>

		<a href="/SignIn" style={{
			textAlign:'right',
			textDecoration:'none',
			color: '#ffff',
			marginLeft:'25%'
		}}
		>
			Sign In
		</a>
		
		</Nav>
		<SidebarNav sidebar={sidebar}>
		<SidebarWrap>
			<NavIcon to="#">
			<AiIcons.AiOutlineClose onClick={showSidebar} />
			</NavIcon>
			{SidebarData.map((item, index) => {
			return <SubMenu item={item} key={index} />;
			})}
		</SidebarWrap>
		</SidebarNav>
	</IconContext.Provider>
	</>
);
};

export default Sidebar;
