import React, { Component }                         from 'react';
import PropTypes                                    from 'prop-types';
import { DragDropContext }                          from 'react-beautiful-dnd';
import Column                                       from "./Column";
import { List }                                     from "immutable";
import { addCard, loadTable, moveCard, removeCard } from "../actions/TableActions";
import { connect }                                  from "react-redux";
import { getColumnsOrder }                          from "../selectors/TableSelectors";


class Table extends Component {
    onDragEnd = (result) => {
        if (result.destination) {
            this.props.moveCard(result);
        }
    };

    columns = () => {
        return this.props.columns.map((column, index) =>
            <Column key={index} index={index} id={column}/>
        );
    };


    componentDidMount() {
        this.props.loadTable();
    }


    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="Table">
                    {this.columns()}
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

    loadTable: PropTypes.func.isRequired,
};

Table.defaultProps = {};


const mapStateToProps = (state) => {
    return {
        columns: getColumnsOrder(state),
    }
};

const mapDispatchToProps = {
    addCard:    addCard,
    moveCard:   moveCard,
    removeCard: removeCard,

    loadTable: loadTable,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
