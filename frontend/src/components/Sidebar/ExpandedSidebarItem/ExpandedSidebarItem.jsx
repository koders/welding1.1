import React from "react";
import classNames from "classnames";
import { SidebarItem } from "../SidebarItem/SidebarItem";

export const ExpandedSidebarItem = ({ pathname, icon, title, items }) => {
    const [expanded,setExpanded] = React.useState(false);

    const toggleAdmin = React.useCallback(() => {
        setExpanded(!expanded);
    }, [expanded]);

    return (
        <div className={classNames("item expandable", { expanded })}>
            <div className="link" onClick={toggleAdmin}>
                <span className="icon"><i className={icon} /></span>
                <span className="title">{title}</span>
            </div>
            <i className="toggle ti-angle-right"></i>
            <div className="expanded-content">
                {/* <div className="link">
                    <span className="icon"><i className="c-blue-500 ti-user" /></span>
                    <span className="title">Users</span>
                </div> */}

                {items.map(item => (
                    <SidebarItem
                        pathname={item.path}
                        selected={pathname === item.path}
                        icon={item.icon}
                        title={item.title}
                    />
                ))}
            </div>
        </div>
    );
};
