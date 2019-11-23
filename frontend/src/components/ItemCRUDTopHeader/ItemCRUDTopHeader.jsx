import React from "react";
import { Header, Button, Icon } from "semantic-ui-react";
import "./ItemCRUDTopHeader.scss";

export const ItemCRUDTopHeader = ({ title, description, icon, handleShow }) => {
    return (
        <div className="top header">
            <Header as="h2">
                <Icon name={icon} />
                <Header.Content>
                    {title}
                    <Header.Subheader>{description}</Header.Subheader>
                </Header.Content>
            </Header>
            <Button primary icon size="small" onClick={handleShow}><Icon name={icon} /> Create New</Button>
        </div>
    );
};
