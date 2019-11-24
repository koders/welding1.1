import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Button, Icon, Modal, Form, Message } from "semantic-ui-react";
import { useToasts } from "react-toast-notifications";
import { ItemCRUDTopHeader } from "../ItemCRUDTopHeader/ItemCRUDTopHeader";
import { Table } from "../Table/Table";

const PRODUCTS = gql`
    {
        products {
            id,
            number,
            description,
            inStock,
            totalShipped,
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

const cells = [
    {name: "Number", field: "number", width: 2},
    {name: "Description", field: "description", width: 8},
    {name: "In Stock", field: "inStock", width: 2},
    {name: "Total Shipped", field: "totalShipped", width: 2},
];

export const Products = React.memo(() => {
    const { loading, error, data } = useQuery(PRODUCTS);
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
            refetchQueries: [{ query: PRODUCTS }] });
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
            refetchQueries: [{ query: PRODUCTS }] });
            addToast("Successfully deleted", { appearance: "success", autoDismiss: true });
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <div className="products">
            <ItemCRUDTopHeader
                title="Products"
                description="Manage Products"
                icon="box"
                handleShow={handleShow}
            />

            <Table
                handleDelete={handleDelete}
                loading={loading}
                error={error}
                data={data}
                field="products"
                width="100%"
                cells={cells}
            />

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
                        <Button type="button" color="red" onClick={handleClose}>Cancel</Button>
                        <Button color="green" icon onClick={handleSave}><Icon name="user plus" /> Save</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        </div>
    );
});
