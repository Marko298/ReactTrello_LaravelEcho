import * as types    from '../constants/ActionTypes';
import { HTTP_HOST } from "../constants/ApiConstants";
import { normalize } from 'normalizr'
import { column }    from '../constants/BackendModels'
import calcPos       from "../utils/calcPos";

export const moveCard = (result) => async (dispatch, getState) => {
    const e = getState().table.entities;

    const old_pos = e.getIn(['cards', result.draggableId, 'pos']);
    const pos = calcPos(e, result.destination.droppableId, result.destination.index, result.draggableId);

    const action = {
        type:    types.CARD_MOVE,
        pos:     pos,
        old_pos: old_pos,
        cardId:  result.draggableId,
        sIndex:  result.source.index,
        dIndex:  result.destination.index,
        sColId:  result.source.droppableId,
        dColId:  result.destination.droppableId,
    };

    await dispatch(action);

    dispatch(persistMoveCard(action))


};

const persistMoveCard = (action) => async (dispatch) => {
    const url = `${HTTP_HOST}/cards/${action.cardId}/move/fast`;
    const r = await fetch(url, {
        method:  'PUT',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body:    JSON.stringify({
            column_id: action.dColId,
            pos:       action.dIndex,
        })
    });

    if (r.status === 200) {
        dispatch({
            type: types.CARD_MOVE_SUCCESS
        })
    } else {
        dispatch({
            ...action,
            type: types.CARD_MOVE_FAILED,
        })
    }
};

export const removeCard = (source, card) => (dispatch, getState) => {
    return {
        type: types.CARD_REMOVE,
        card: card
    }
};

export const addCard = (destination, card) => (dispatch, getState) => {
    return {
        type: types.CARD_ADD,
        card: card
    }
};


export const loadTable = () => async (dispatch) => {
    await dispatch({
        type: types.TABLE_LOAD
    });

    const r = await fetch(`${HTTP_HOST}/cards`);
    const json = await r.json();

    const {entities, result} = normalize(json, [column]);

    dispatch({
        type:          types.TABLE_LOAD_SUCCESS,
        entities:      entities,
        columns_order: result,
    })
};