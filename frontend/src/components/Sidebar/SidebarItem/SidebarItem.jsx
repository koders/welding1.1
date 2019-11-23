import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

export const SidebarItem = ({ pathname, selected, icon, title }) => {
    return (
        <div className={classNames("item", {
            "selected": selected,
        })}>
            <Link to={pathname} className="link">
                <Icon name={icon} />
                <span className="title">{title}</span>
            </Link>
        </div>
    );
};
