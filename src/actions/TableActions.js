import * as types    from '../constants/ActionTypes';
import { toId }      from "../utils/dndHelper";
import { HTTP_HOST } from "../constants/ApiConstants";
import { normalize } from 'normalizr'
import { table }     from '../constants/BackendModels'

export const moveCard = (result) => async (dispatch, getState) => {
    const sColId = toId(result.source.droppableId);
    const dColId = toId(result.destination.droppableId);
    const cardId = toId(result.draggableId);

    await dispatch({
        type:   types.CARD_MOVE,
        cardId,
        sColId,
        dColId,
        sIndex: result.source.index,
        dIndex: result.destination.index,
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