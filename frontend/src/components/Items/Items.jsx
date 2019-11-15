import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Button, Modal, Form } from "react-bootstrap";
import "./Items.scss";

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

export const Items = ({ title }) => {
    const { loading, error, data } = useQuery(TERMS);
    const [addTerms] = useMutation(ADD_TERMS);
    const [deleteTerms] = useMutation(DELETE_TERMS);

    const [show, setShow] = React.useState(false);
    const [field, setField] = React.useState("");

    const handleClose = React.useCallback(() => {
        setShow(false);
        setField("");
    }, []);
    const handleShow = React.useCallback(() => setShow(true), []);
    const handleSave = React.useCallback(() => {
        addTerms({ variables: {
            title: field,
        },
        refetchQueries: [{ query: TERMS }] });
        handleClose();
    }, [field]);

    const handleFieldChange = (e) => setField(e.target.value);
    const handleDelete = ({currentTarget}) => {
        deleteTerms({ variables: {
            id: currentTarget.value,
        },
        refetchQueries: [{ query: TERMS }] });
    };

    if (loading) {
        return "Loading...";
    }

    if (error) {
        return `Error: ${error}`;
    }

    return (
        <div className="items">
            <div className="top">
                <h2>{title}</h2>
                <Button variant="success" onClick={handleShow}>Add New</Button>
            </div>
            <div className="list">
                <div className="header">
                    <div className="username">{title}</div>
                    <div className="delete"></div>
                </div>
                <div className="body">
                    {data.terms.map(term => {
                        return (
                            <div className="terms" key={term.id}>
                                <div className="title">{term.title}</div>
                                <div className="delete">
                                    <Button variant="danger" value={term.id} onClick={handleDelete}>
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
                    <Modal.Title>New {title.substring(0, title.length - 1)}</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group controlId="formUsername">
                            <Form.Label>{title}</Form.Label>
                            <Form.Control value={field} onChange={handleFieldChange} type="text" placeholder={title} />
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
