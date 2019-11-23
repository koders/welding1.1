import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./Users.scss";
import { Header, Button, Icon, Table, Modal, Form, Message, Loader } from "semantic-ui-react";
import { useToasts } from "react-toast-notifications";
import * as classNames from "classnames";

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

            <div className="table">
                <div className="loader">
                    <Loader active inline>Loading...</Loader>
                </div>
                <Table>
                    <Table.Header fullWidth>
                        <Table.Row>
                            <Table.HeaderCell width={7}>Username</Table.HeaderCell>
                            <Table.HeaderCell width={7}>Role</Table.HeaderCell>
                            <Table.HeaderCell width={2}/>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {error && (
                            <Table.Row>
                                <Table.Cell colSpan="3">
                                    <Message icon negative>
                                        <Icon name="ambulance" />
                                        <Message.Content>
                                            <Message.Header>Error</Message.Header>
                                            <p>Could not load table data :(</p>
                                            <p>Please try reloading the page</p>
                                            <p>If reload doesn't work, then contact the administrator</p>
                                        </Message.Content>
                                    </Message>
                                </Table.Cell>
                            </Table.Row>
                        )}
                        {data && data.users.map(user => {
                            return (
                                <Table.Row key={user.id}>
                                    <Table.Cell>{user.username}</Table.Cell>
                                    <Table.Cell>{user.role}</Table.Cell>
                                    <Table.Cell>
                                        <Button icon color="red" value={user.id} onClick={handleDelete}>
                                            <Icon name="delete" />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            </div>

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
