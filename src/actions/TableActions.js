import * as types    from '../constants/ActionTypes';
import { HTTP_HOST } from "../constants/ApiConstants";
import { normalize } from 'normalizr'
import { column }    from '../constants/BackendModels'

export const moveCard = (result) => async (dispatch) => {
    const action = {
        type:   types.CARD_MOVE,
        sIndex: result.source.index,
        dIndex: result.destination.index,
        cardId: parseInt(result.draggableId, 10),
        sColId: parseInt(result.source.droppableId, 10),
        dColId: parseInt(result.destination.droppableId, 10),
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
            position:  action.dIndex,
            column_id: action.dColId,
        })
    }).catch(() => {
        dispatch(cardMoveFailed(action));
    });

    if (r) {
        if (r.status === 200) {
            dispatch({
                type: types.CARD_MOVE_SUCCESS
            })
        } else {
            dispatch(cardMoveFailed(action))
        }

    }
};

const cardMoveFailed = (action) => {
    return {
        ...action,
        type: types.CARD_MOVE_FAILED,
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