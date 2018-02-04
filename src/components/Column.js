import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { Droppable }        from "react-beautiful-dnd";
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
        const {index, id} = this.props;
        const column = this.props.columns.get(id);

        return (
            <div className="Column" id={`Column-${id}`}>
                <div className="header">
                </div>
                <Droppable index={index} droppableId={id}>
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
