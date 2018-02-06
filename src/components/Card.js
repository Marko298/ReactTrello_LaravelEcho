import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { Draggable }        from "react-beautiful-dnd";
import { Map }              from "immutable";
import { connect }          from "react-redux";
import { getCard }          from "../selectors/TableSelectors";

class Card extends Component {
    render() {
        const {id, index, card} = this.props;

        return (
            <Draggable draggableId={id} index={index}>
                {(provided) => (
                    <div>
                        <div
                            className="Card" id={id.toString()}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <div className="inner">
                                {card.get('name')}
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
    id:    PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,

    card: PropTypes.instanceOf(Map).isRequired
};


const mapStateToProps = (state, props) => {

    return {
        card: getCard(state, props.id),
    }
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Card);