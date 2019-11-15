import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Button, Modal, Form } from "react-bootstrap";
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

const ADD_USER = gql`
    mutation AddUser($username: String!, $password: String!, $role: String!){
        addUser(username: $username, password: $password, role: $role) {
        id,
        username,
        password,
        role
        }
    }
`;

const DELETE_USER = gql`
    mutation deleteUser($id: ID!){
        deleteUser(id: $id) {
            id,
        }
    }
`;

export const Users = () => {
    const { loading, error, data } = useQuery(USERS);
    const [addUser, { data: newUserData }] = useMutation(ADD_USER);
    const [deleteUser] = useMutation(DELETE_USER);

    const [show, setShow] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [role, setRole] = React.useState("user");

    const handleClose = React.useCallback(() => {
        setShow(false);
        setUsername("");
        setPassword("");
        setRole("user");
    }, []);
    const handleShow = React.useCallback(() => setShow(true), []);
    const handleSave = React.useCallback(() => {
        addUser({ variables: {
            username,
            password,
            role,
        },
        refetchQueries: [{ query: USERS }] });
        handleClose();
    },
    [username, password, role, addUser, handleClose]);

    const handleUserChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRoleChange = (e) => setRole(e.target.value);
    const handleDelete = ({currentTarget}) => {
        deleteUser({ variables: {
            id: currentTarget.value,
        },
        refetchQueries: [{ query: USERS }] });
    };

    if (loading) {
        return "Loading...";
    }

    if (error) {
        return `Error: ${error}`;
    }

    return (
        <div className="users">
            <div className="top">
                <h2>Users</h2>
                <Button variant="success" onClick={handleShow}>Add New</Button>
            </div>
            <div className="list">
                <div className="header">
                    <div className="username">Username</div>
                    <div className="role">Role</div>
                    <div className="delete"></div>
                </div>
                <div className="body">
                    {data.users.map(user => {
                        return (
                            <div className="user" key={user.id}>
                                <div className="username">{user.username}</div>
                                <div className="role">{user.role}</div>
                                <div className="delete">
                                    <Button variant="danger" value={user.id} onClick={handleDelete}>
                                        <i className="ti-trash" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New User</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={username} onChange={handleUserChange} type="email" placeholder="Username" />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={password} onChange={handlePasswordChange} type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control as="select" value={role} onChange={handleRoleChange}>
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success" onClick={handleSave}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </div>
    );
};
