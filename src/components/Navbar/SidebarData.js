import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        className: 'nav-text',
        notLoggedIn: true,
        loggedIn: true
    },
    {
        title: 'Services',
        path: '/services',
        icon: <IoIcons.IoIosBusiness/>,
        className: 'nav-text',
        notLoggedIn: true,
        loggedIn: true

    },
    {
        title: 'Sign in',
        path: '/signin',
        icon: <IoIcons.IoMdPeople />,
        className: 'nav-text',
        notLoggedIn: true,
        loggedIn: false

    },
    {
        title: 'Sign up',
        path: '/signup',
        icon: <IoIcons.IoMdPeople />,
        className: 'nav-text',
        notLoggedIn: true,
        loggedIn: false

    },

    {
        title: 'Reservation History',
        path: '/reservationhistory',
        icon: <FaIcons.FaClipboardList />,
        className: 'nav-text',
        notLoggedIn: false,
        loggedIn: true

    },

]
