import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Header, Button, Icon, Table, Modal, Form, Message, Loader } from "semantic-ui-react";
import { useToasts } from "react-toast-notifications";
import * as classNames from "classnames";
import "./Terms.scss";

const TERMS = gql`
    {
        terms {
            id,
            title,
        }
    }
`;

const ADD_TERMS = gql`
    mutation AddTerms($title: String!){
        addTerms(title: $title) {
            title,
        }
    }
`;

const DELETE_TERMS = gql`
    mutation deleteTerms($id: ID!){
        deleteTerms(id: $id) {
            id,
        }
    }
`;

export const Terms = () => {
    const { loading, error, data } = useQuery(TERMS);
    const [addTerms, addTermsError] = useMutation(ADD_TERMS);
    const [deleteTerms] = useMutation(DELETE_TERMS);

    const [show, setShow] = React.useState(false);
    const [field, setField] = React.useState("");

    const { addToast } = useToasts();

    const handleClose = React.useCallback(() => {
        setShow(false);
        setField("");
    }, []);
    const handleShow = React.useCallback(() => setShow(true), []);
    const handleSave = React.useCallback(() => {
        try {
            addTerms({ variables: {
                title: field,
            },
            refetchQueries: [{ query: TERMS }] });
            handleClose();
            addToast("Successfully created", { appearance: "success", autoDismiss: true });
        } catch (e) {
            console.error(e);
        }
    }, [field]);

    const handleFieldChange = React.useCallback((e) => setField(e.target.value));
    const handleDelete = React.useCallback(({currentTarget}) => {
        try {
            deleteTerms({ variables: {
                id: currentTarget.value,
            },
            refetchQueries: [{ query: TERMS }] });
            addToast("Successfully deleted", { appearance: "success", autoDismiss: true });
        } catch (e) {
            console.error(e);
        }
    });


    /**
     * Changes ->
     * icon
     * table columns
     *
     */

    return (
        <div className={classNames("terms", { loading })}>
            <div className="top">
                <Header as="h2">
                    <Icon name="truck" />
                    <Header.Content>
                        Terms
                        <Header.Subheader>Manage Delivery Terms</Header.Subheader>
                    </Header.Content>
                </Header>
                <Button primary icon size="small" onClick={handleShow}><Icon name="truck" /> Create New</Button>
            </div>

            <div className="table">
                <div className="loader">
                    <Loader active inline>Loading...</Loader>
                </div>
                <Table style={{ position: "relative" }}>
                    <Table.Header fullWidth>
                        <Table.Row>
                            <Table.HeaderCell width={14}>Terms</Table.HeaderCell>
                            <Table.HeaderCell width={2} />
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
                        {data && data.terms.map(term => {
                            return (
                                <Table.Row key={term.id}>
                                    <Table.Cell>{term.title}</Table.Cell>
                                    <Table.Cell>
                                        <Button icon color="red" value={term.id} onClick={handleDelete}>
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
                    <Form error={!!addTermsError.error}>
                        <Form.Input
                            placeholder="Terms"
                            label="Terms"
                            onChange={ handleFieldChange }
                            value={ field }
                        />
                        <Form.Field>
                            <Message
                                error
                                header="Error"
                                content={addTermsError.error && addTermsError.error.message}
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
