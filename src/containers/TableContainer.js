import Table                 from '../components/Table';
import React                 from "react";
import { connect }           from "react-redux";
import { add, move, remove } from "../actions/TableActions";


const TableContainer = (props) => {
    return <Table {...props}/>
};

const mapStateToProps = (state) => {
    return {
        columns: state.table.columns,
    }
};

const mapDispatchToProps = {
    addCard:    add,
    moveCard:   move,
    removeCard: remove,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);