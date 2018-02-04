import React, { Component }                         from 'react';
import PropTypes                                    from 'prop-types';
import { DragDropContext }                          from 'react-beautiful-dnd';
import Column                                       from "./Column";
import { Map }                                      from "immutable";
import { addCard, loadTable, moveCard, removeCard } from "../actions/TableActions";
import { connect }                                  from "react-redux";


class Table extends Component {
    onDragEnd = (result) => {
        // console.log(result);
        if (result.destination) {
            this.props.moveCard(result);
        }
    };

    columns = (columns) => {
        return columns.map((column, index) => {
            return <Column
                key={index}
                index={index}
                id={column.toString()}
            />
        });
    };


    componentDidMount() {
        this.props.loadTable();
    }


    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="Table">
                    {this.columns(this.props.table.get('columns'))}
                </div>
            </DragDropContext>
        );
    }
}

Table.propTypes = {
    table: PropTypes.instanceOf(Map).isRequired,

    addCard:    PropTypes.func.isRequired,
    moveCard:   PropTypes.func.isRequired,
    removeCard: PropTypes.func.isRequired,

    loadTable: PropTypes.func.isRequired,
};

Table.defaultProps = {};


const mapStateToProps = (state) => {
    const e = state.table.entities;

    return {
        table: e.getIn(['tables', (1).toString()]),
    }
};

const mapDispatchToProps = {
    addCard:    addCard,
    moveCard:   moveCard,
    removeCard: removeCard,

    loadTable: loadTable,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
