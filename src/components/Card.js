import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { Draggable }        from "react-beautiful-dnd";
import { toDraggable }      from "../utils/dndHelper";
import { Map }              from "immutable";
import { connect }          from "react-redux";

class Card extends Component {
    render() {
        const {id, cards, index} = this.props;
        const card = cards.get(id);
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
    id:    PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,

    cards: PropTypes.instanceOf(Map).isRequired
};


const mapStateToProps = (state) => {
    const e = state.table.entities;

    return {
        cards: e.get('cards'),
    }
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Card);