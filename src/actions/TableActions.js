import * as types        from '../constants/ActionTypes';
import { fromDroppable } from "../utils/dndHelper";

export const move = (result) => (dispatch, getState) => {
    const {table: {columns}} = getState();
    const {id: sColId, index: sColIndex} = fromDroppable(result.source.droppableId);
    const {id: dColId, index: dColIndex} = fromDroppable(result.destination.droppableId);
    const card = columns.getIn([sColIndex, 'cards', result.source.index]);

    dispatch({
        type:   types.CARD_MOVE,
        card,
        sColId,
        dColId,
        sColIndex,
        dColIndex,
        sIndex: result.source.index,
        dIndex: result.destination.index
    });
};

export const remove = (source, card) => (dispatch, getState) => {
    return {
        type: types.CARD_REMOVE,
        card: card
    }
};

export const add = (destination, card) => (dispatch, getState) => {
    return {
        type: types.CARD_ADD,
        card: card
    }
};
