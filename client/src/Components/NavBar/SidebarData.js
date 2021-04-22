import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import *as IconName  from "react-icons/ai";
import *as GoIcon  from "react-icons/go";
import *as MdIcon  from "react-icons/md";
export const SidebarData = [
{
	title: "Home",
	path: "/",
	icon: <AiIcons.AiFillHome />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	// subNav: [
	// {
	// 	title: "Our Aim",
	// 	path: "/about-us/aim",
	// 	icon: <IoIcons.IoIosPaper />,
	// },
	// {
	// 	title: "Our Vision",
	// 	path: "/about-us/vision",
	// 	icon: <IoIcons.IoIosPaper />,
	// },
	
	// ],
},
{
	title: "Inventry Managemet",
	path: "/contact",
	icon: <IconName.AiOutlineDatabase />,
},
{
	title: "Order Manegment",
	path: "/order",
	icon: <FaIcons.FaBeer />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "Service 1",
		path: "/services/services1",
		icon: <IoIcons.IoIosPaper />,
		cName: "sub-nav",
	},
	{
		title: "Service 2",
		path: "/services/services2",
		icon: <IoIcons.IoIosPaper />,
		cName: "sub-nav",
	},
	{
		title: "Service 3",
		path: "/services/services3",
		icon: <IoIcons.IoIosPaper />,
	},
	],
},
{
	title: "Employee Managemet",
	path: "get_Emp",
	icon: <IconName.AiOutlineUser />,
},
{
	title: "Attendance and Leave",
	path: "/events",
	icon: <GoIcon.GoCalendar />,



},
{
	title: "Supplier Managemet",
	path: "/support",
	icon: <MdIcon.MdLocalShipping />,
},
{
	title: "Finance Managemet",
	path: "/finan",
	icon: <IconName.AiOutlineDollar/>,
},
{
	title: "Delivey Managemet",
	path: "/support",
	icon: <FaIcons.FaBiking />,
},
{
	title: "Reservation Managemet",
	path: "/support",
	icon: <IoIcons.IoMdHelpCircle />,
},
{
	title: "Contact",
	path: "/support",
	icon: <IoIcons.IoMdHelpCircle />,
},
{
	title: "About Us",
	path: "/support",
	icon: <IoIcons.IoMdHelpCircle />,
},
];
