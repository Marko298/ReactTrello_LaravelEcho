import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { Draggable }        from "react-beautiful-dnd";
import { Map }              from "immutable";
import { connect }          from "react-redux";

class Card extends Component {
    render() {
        const {id, index} = this.props;
        const card = this.props.cards.get(id);

        return (
            <Draggable draggableId={id} index={index}>
                {(provided) => (
                    <div>
                        <div
                            className="Card" id={`Card-${id}`}
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