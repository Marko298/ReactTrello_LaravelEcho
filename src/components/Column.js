import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { Droppable }        from "react-beautiful-dnd";
import Card                 from "./Card";
import { connect }          from "react-redux";
import { Map }              from 'immutable';
import { getColumn }        from "../selectors/TableSelectors";

class Column extends Component {
    cards = () => {
        const cards = this.props.column.get('cards');
        return cards.map((card, index) =>
            <Card id={card} key={index} index={index}/>
        );
    };

    render() {
        const {id, index, column} = this.props;

        return (
            <div className="Column" id={`Column-${id}`}>
                <div className="header">{column.get('name')}</div>
                <Droppable index={index} droppableId={id.toString()}>
                    {(provided) => (
                        <div ref={provided.innerRef} className="droppable">
                            {this.cards()}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}

Column.propTypes = {
    id:    PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,

    column: PropTypes.instanceOf(Map).isRequired,
};

const mapStateToProps = (state, props) => {
    return {
        column: getColumn(state, props.id),
    }
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Column);
