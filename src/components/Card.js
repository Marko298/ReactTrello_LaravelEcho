import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { Draggable }        from "react-beautiful-dnd";
import { toDraggable }      from "../utils/dndHelper";
import { Map }              from "immutable";

class Card extends Component {
    render() {
        const {card, index} = this.props;
        const draggableId = toDraggable(card.get('id'), index);

        return (
            <Draggable draggableId={draggableId} index={index}>
                {(provided) => (
                    <div>
                        <div
                            className="Card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <div className="inner">
                                {card.get('text')}
                            </div>
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Draggable>
        );
    }
}

Card.propTypes = {
    card:  PropTypes.instanceOf(Map).isRequired,
    index: PropTypes.number.isRequired,
};

export default Card;
