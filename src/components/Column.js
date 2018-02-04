import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { Droppable }        from "react-beautiful-dnd";
import { toDroppable }      from "../utils/dndHelper";
import Card                 from "./Card";
import { connect }          from "react-redux";
import { Map }              from 'immutable';

class Column extends Component {
    cards = (cards) => {
        return cards.map((card, index) => (
            <Card id={card.toString()} key={index} index={index}/>
        ));
    };

    render() {
        const {index, columns, id} = this.props;
        const column = columns.get(id);
        const droppableId = toDroppable(column.get('id'), index);

        return (
            <div className="Column">
                <div className="header">
                </div>
                <Droppable index={index} droppableId={droppableId}>
                    {(provided) => (
                        <div ref={provided.innerRef} className="droppable">
                            {this.cards(column.get('cards'))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}

Column.propTypes = {
    id:    PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,

    columns: PropTypes.instanceOf(Map).isRequired,
};

const mapStateToProps = (state) => {
    return {
        columns: state.table.entities.get('columns'),
    }
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Column);
