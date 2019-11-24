import React from "react";
import Logo from "../Login/gjerde-logo.png";
import { SidebarItem } from "./SidebarItem/SidebarItem";
import { ExpandedSidebarItem } from "./ExpandedSidebarItem/ExpandedSidebarItem";

export const Sidebar = ({ pathname }) => {

    const items = [
        {path: "/", icon: "dashboard", title: "Dashboard"},
        {path: "/orders", icon: "clipboard outline", title: "Orders"},
        {icon: "settings", title: "Administration", expanded: true, items:[
            {path: "/users", icon: "users", title: "Users"},
            {path: "/terms", icon: "truck", title: "Terms"},
            {path: "/products", icon: "box", title: "Products"},
        ]},
        {path: "/invoices", icon: "file outline", title: "Invoices"},
        {path: "/statistics", icon: "line graph", title: "Statistics"},
        {path: "/logout", icon: "sign out", title: "Logout"},
    ];

    return (
        <div className="sidebar">
            <div className="logo">
                <img src={Logo} alt="logo" />
            </div>
            <div className="menu">
                {items.map(item => {
                    return item.path
                        ? (
                            <SidebarItem
                                key={item.title}
                                pathname={item.path}
                                selected={pathname === item.path}
                                icon={item.icon}
                                title={item.title}
                            />
                        )
                        : (
                            <ExpandedSidebarItem
                                key={item.title}
                                icon={item.icon}
                                title={item.title}
                                pathname={pathname}
                                items={item.items}
                            />
                        );
                })}
            </div>
        </div>
    );
};
