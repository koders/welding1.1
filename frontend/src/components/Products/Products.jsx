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

const ADD_PRODUCT = gql`
    mutation AddProduct($number: String!, $description: String!){
        addProduct(number: $number, description: $description) {
            id,
        }
    }
`;

const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: ID!){
        deleteProduct(id: $id) {
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
    const [addProduct, addProductError] = useMutation(ADD_PRODUCT);
    const [deleteProduct] = useMutation(DELETE_PRODUCT);

    const [show, setShow] = React.useState(false);
    const [number, setNumber] = React.useState("");
    const [description, setDescription] = React.useState("");

    const { addToast } = useToasts();

    const handleClose = React.useCallback(() => {
        setShow(false);
        setNumber("");
        setDescription("");
    }, []);
    const handleShow = React.useCallback(() => setShow(true), []);
    const handleSave = React.useCallback(() => {
        try {
            addProduct({ variables: {
                number,
                description,
            },
            refetchQueries: [{ query: PRODUCTS }] });
            handleClose();
            addToast("Successfully created", { appearance: "success", autoDismiss: true });
        } catch (e) {
            console.error(e);
        }
    }, [number, description]);

    const handleNumberChange = React.useCallback((e) => setNumber(e.target.value));
    const handleDescriptionChange = React.useCallback((e) => setDescription(e.target.value));
    const handleDelete = React.useCallback(({currentTarget}) => {
        try {
            deleteProduct({ variables: {
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
                <Modal.Header>New Product</Modal.Header>
                <Modal.Content>
                    <Form error={!!addProductError.error}>
                        <Form.Input
                            placeholder="Number"
                            label="Number"
                            onChange={ handleNumberChange }
                            value={ number }
                        />
                        <Form.Input
                            placeholder="Description"
                            label="Description"
                            onChange={ handleDescriptionChange }
                            value={ description }
                        />
                        <Form.Field>
                            <Message
                                error
                                header="Error"
                                content={addProductError.error && addProductError.error.message}
                            />
                        </Form.Field>
                        <Button type="button" color="red" onClick={handleClose}>Cancel</Button>
                        <Button type="button" color="green" icon onClick={handleSave}><Icon name="user plus" /> Save</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        </div>
    );
});
