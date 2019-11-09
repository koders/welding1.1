import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

export const SidebarItem = ({ pathname, selected, icon, title, children }) => {
    return (
        <div className={classNames("item", {
            "selected": selected,
        })}>
            <Link to={pathname} className="link">
                <span className="icon"><i className={icon} /></span>
                <span className="title">{title}</span>
            </Link>
            { children }
        </div>
    );
};
