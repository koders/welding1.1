import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./Users.scss";
import { Header, Button, Icon, Modal, Form, Message } from "semantic-ui-react";
import { useToasts } from "react-toast-notifications";
import * as classNames from "classnames";
import { Table } from "../Table/Table";

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
    const [addUser, addUserError] = useMutation(ADD_USER);
    const [deleteUser] = useMutation(DELETE_USER);

    const [show, setShow] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [role, setRole] = React.useState("user");

    const { addToast } = useToasts();

    const handleClose = React.useCallback(() => {
        setShow(false);
        setUsername("");
        setPassword("");
        setRole("user");
    }, []);
    const handleShow = React.useCallback(() => setShow(true), []);
    const handleSave = React.useCallback(async () => {
        try {
            await addUser({ variables: {
                username,
                password,
                role,
            },
            refetchQueries: [{ query: USERS }] });
            handleClose();
            addToast("User created", { appearance: "success", autoDismiss: true });
        } catch (e) {
            console.error("error", e);
        }
    },
    [username, password, role, addUser, handleClose]);

    const handleUsernameChange = React.useCallback((e) => setUsername(e.target.value));
    const handlePasswordChange = React.useCallback((e) => setPassword(e.target.value));
    const handleRoleChange = React.useCallback((e, { value }) => console.log(value) || setRole(value));
    const handleDelete = React.useCallback(async ({currentTarget}) => {
        try {
            await deleteUser({ variables: {
                id: currentTarget.value,
            },
            refetchQueries: [{ query: USERS }] });
            addToast("User deleted", { appearance: "success", autoDismiss: true });
        } catch (e) {
            console.error(e);
        }
    });

    return (
        <div className={classNames("users", { loading })}>
            <div className="top">
                <Header as="h2">
                    <Icon name="users" />
                    <Header.Content>
                        Users
                        <Header.Subheader>Manage Users</Header.Subheader>
                    </Header.Content>
                </Header>
                <Button primary icon size="small" onClick={handleShow}><Icon name="user" /> Create New</Button>
            </div>

            <Table
                handleDelete={handleDelete}
                loading={loading}
                error={error}
                data={data}
                field="users"
                cells={[
                    {name: "Username", field: "username", width: 7},
                    {name: "Role", field: "role", width: 7},
                ]}
            />

            <Modal open={show} size="tiny">
                <Modal.Header>New User</Modal.Header>
                <Modal.Content>
                    <Form error={!!addUserError.error}>
                        <Form.Input
                            placeholder="Username"
                            label="Username"
                            onChange={ handleUsernameChange }
                            value={ username }
                        />
                        <Form.Input
                            type="password"
                            placeholder="Password"
                            label="Password"
                            onChange={ handlePasswordChange }
                            value={ password }
                        />
                        <Form.Select
                            fluid
                            label="Role"
                            onChange={handleRoleChange}
                            value={role}
                            options={[
                                { text: "User", value: "user" },
                                { text: "admin", value: "admin" },
                            ]}
                        />
                        <Form.Field>
                            <Message
                                error
                                header="Error"
                                content={addUserError.error && addUserError.error.message}
                            />
                        </Form.Field>
                        <Button color="red" onClick={handleClose}>Cancel</Button>
                        <Button color="green" icon onClick={handleSave}><Icon name="user plus" /> Save</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        </div>
    );
};
