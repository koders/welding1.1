import React from "react";
import * as classNames from "classnames";
import { Button, Icon, Table as SemanticTable, Message, Loader } from "semantic-ui-react";
import "./Table.scss";

export const Table = React.memo((props) => {
    const { handleDelete, loading, error, data, cells, field, width } = props;
    console.log("rendering table", props);

    return (
        <div className={classNames("data-table", { loading })} style={{ width: width || "400px"}}>
            <div className="loader">
                <Loader active inline>Loading...</Loader>
            </div>
            <SemanticTable style={{ position: "relative" }}>
                <SemanticTable.Header fullWidth>
                    <SemanticTable.Row>
                        {cells.map(cell => (
                            <SemanticTable.HeaderCell key={cell.name} width={cell.width}>{cell.name}</SemanticTable.HeaderCell>
                        ))}
                        <SemanticTable.HeaderCell width={2} />
                    </SemanticTable.Row>
                </SemanticTable.Header>
                <SemanticTable.Body>
                    {error && (
                        <SemanticTable.Row>
                            <SemanticTable.Cell colSpan="3">
                                <Message icon negative>
                                    <Icon name="ambulance" />
                                    <Message.Content>
                                        <Message.Header>Error</Message.Header>
                                        <p>Could not load SemanticTable data :(</p>
                                        <p>Please try reloading the page</p>
                                        <p>If reload doesn't work, then contact the administrator</p>
                                    </Message.Content>
                                </Message>
                            </SemanticTable.Cell>
                        </SemanticTable.Row>
                    )}
                    {data && data[field].map(term => {
                        return (
                            <SemanticTable.Row key={term.id}>
                                {cells.map(cell => (
                                    <SemanticTable.Cell key={cell.name}>{term[cell.field]}</SemanticTable.Cell>
                                ))}
                                <SemanticTable.Cell>
                                    <Button icon color="red" value={term.id} onClick={handleDelete}>
                                        <Icon name="delete" />
                                    </Button>
                                </SemanticTable.Cell>
                            </SemanticTable.Row>
                        );
                    })}
                </SemanticTable.Body>
            </SemanticTable>
        </div>
    );
});
