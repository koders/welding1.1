import React from "react"
import classNames from "classnames";
import Logo from "../Login/gjerde-logo.png";
import { SidebarItem } from "../SidebarItem/SidebarItem"

export const Sidebar = ({ pathname }) => {
    const [adminExpanded,setAdminExpanded] = React.useState(false);

    const toggleAdmin = React.useCallback(() => {
        setAdminExpanded(!adminExpanded);
    }, [adminExpanded]);

    const adminButton = (
        <div className={classNames("item expandable", {
            "expanded": adminExpanded,
        })}>
            <div className="link" onClick={toggleAdmin}>
                <span className="icon"><i className="c-blue-500 ti-settings" /></span>
                <span className="title">Administration</span>
            </div>
            <i className="toggle ti-angle-right"></i>
            <div className="expanded-content">
                <div className="link">
                    <span className="icon"><i className="c-blue-500 ti-user" /></span>
                    <span className="title">Users</span>
                </div>
            </div>
        </div>
    );

    const items = [
        {path: "/", icon: "ti-home", title: "Dashboard"},
        {path: "/orders", icon: "ti-receipt", title: "Orders"},
        adminButton,
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
                        : item;
                })}
            </div>
        </div>
    )
}
