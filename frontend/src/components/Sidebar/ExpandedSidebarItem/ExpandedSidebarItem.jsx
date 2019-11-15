import React from "react";
import classNames from "classnames";
import { SidebarItem } from "../SidebarItem/SidebarItem";

export const ExpandedSidebarItem = ({ pathname, icon, title, items }) => {
    const [expanded,setExpanded] = React.useState(true);

    const toggleAdmin = React.useCallback(() => {
        setExpanded(!expanded);
    }, [expanded]);

    const style = expanded ? {height: (items.length * 45) + "px"} : {};

    return (
        <div className={classNames("item expandable", { expanded })}>
            <div className="link" onClick={toggleAdmin}>
                <span className="icon"><i className={icon} /></span>
                <span className="title">{title}</span>
            </div>
            <i className="toggle ti-angle-right"></i>
            <div className="expanded-content" style={style}>
                {items.map(item => (
                    <SidebarItem
                        key={item.title}
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
