import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { DragDropContext }  from 'react-beautiful-dnd';
import Column               from "./Column";
import { List }             from "immutable";

class Table extends Component {
    onDragEnd = (result) => {
        console.log(result);
        if (result.destination) {
            this.props.moveCard(result);
        }
    };

    columns = (columns) => {
        return columns.map((column, index) => {
            return <Column
                key={index}
                index={index}
                column={column}
            />
        });
    };


    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="Table">
                    {this.columns(this.props.columns)}
                </div>
            </DragDropContext>
        );
    }
}

Table.propTypes = {
    columns: PropTypes.instanceOf(List).isRequired,

    addCard:    PropTypes.func.isRequired,
    moveCard:   PropTypes.func.isRequired,
    removeCard: PropTypes.func.isRequired,
};

Table.defaultProps = {};

export default Table;
