import * as types    from '../constants/ActionTypes';
import { HTTP_HOST } from "../constants/ApiConstants";
import { normalize } from 'normalizr'
import { table }     from '../constants/BackendModels'

export const moveCard = (result) => async (dispatch) => {
    await dispatch({
        type:   types.CARD_MOVE,
        cardId: result.draggableId,
        sIndex: result.source.index,
        dIndex: result.destination.index,
        sColId: result.source.droppableId,
        dColId: result.destination.droppableId,
    });


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

    const r = await fetch(HTTP_HOST + '/cards');
    const json = await r.json();

    const {entities} = normalize(json, table);

    dispatch({
        entities: entities,
        type:     types.TABLE_LOAD_SUCCESS,
    })
};