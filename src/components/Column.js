import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { Droppable }        from "react-beautiful-dnd";
import { toDroppable }      from "../utils/dndHelper";
import Card                 from "./Card";
import { Map }              from 'immutable';

class Column extends Component {
    cards = (cards) => {
        return cards.map((card, index) => (
            <Card card={card} key={index} index={index}/>
        ));
    };

    render() {
        const {index, column} = this.props;
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
    index:  PropTypes.number.isRequired,
    column: PropTypes.instanceOf(Map).isRequired,
};

export default Column;
