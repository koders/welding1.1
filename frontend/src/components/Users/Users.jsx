import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./Users.scss";

const USERS = gql`
    {
        users {
            id,
            username,
            role,
        }
    }
`;

export const Users = () => {
    const { loading, error, data } = useQuery(USERS);

    if (loading) {
        return "Loading...";
    }

    if (error) {
        return `Error: ${error}`;
    }

    console.log(data);

    return (
        <div className="users">
            <div className="top">
                <h2>Users</h2>
                <button type="button" className="btn btn-success">Add New</button>
            </div>
            <div className="list">
                <div className="header">
                    <div className="username">Username</div>
                    <div className="role">Role</div>
                </div>
                <div className="body">
                    {data.users.map(user => {
                        return (
                            <div className="user" key={user.id}>
                                <div className="username">{user.username}</div>
                                <div className="role">{user.role}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
