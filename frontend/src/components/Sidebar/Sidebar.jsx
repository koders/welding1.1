import React from "react";
import Logo from "../Login/gjerde-logo.png";
import { SidebarItem } from "./SidebarItem/SidebarItem";
import { ExpandedSidebarItem } from "./ExpandedSidebarItem/ExpandedSidebarItem";

export const Sidebar = ({ pathname }) => {

    const items = [
        {path: "/", icon: "ti-home", title: "Dashboard"},
        {path: "/orders", icon: "ti-receipt", title: "Orders"},
        {icon: "ti-settings", title: "Administration", expanded: true, items:[
            {path: "/users", icon: "ti-user", title: "Users"},
        ]},
        {path: "/invoices", icon: "ti-archive", title: "Invoices"},
        {path: "/statistics", icon: "ti-stats-up", title: "Statistics"},
        {path: "/logout", icon: "ti-power-off", title: "Logout"},
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
                                pathname={item.path}
                                selected={pathname === item.path}
                                icon={item.icon}
                                title={item.title}
                            />
                        )
                        : (
                            <ExpandedSidebarItem
                                icon={item.icon}
                                title={item.title}
                                pathname={item.path}
                                items={item.items}
                            />
                        );
                })}
            </div>
        </div>
    )
}
