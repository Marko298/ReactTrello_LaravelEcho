import * as types            from '../constants/ActionTypes';
import { fromJS, List, Map } from 'immutable';

const initialState = {
    isLoading:     false,
    entities:      new Map(),
    columns_order: new List(),
};

const table = (state = initialState, action) => {
    switch (action.type) {
        case types.TABLE_LOAD_SUCCESS:
            return {
                ...state,
                isLoading:     false,
                entities:      fromJS(action.entities),
                columns_order: fromJS(action.columns_order),
            };

        case types.TABLE_LOAD:
            return {
                ...state,
                isLoading: true,
            };

        case types.CARD_ADD:
            return {
                ...state,
            };

        case types.SERVER_CARD_MOVE:
        case types.CARD_MOVE:
            const e = state
                .entities
                .deleteIn(['columns', action.sColId.toString(), 'cards', action.sIndex])
                .updateIn(['columns', action.dColId.toString(), 'cards'], (cards) => cards.insert(action.dIndex, parseInt(action.cardId, 10)))
                .updateIn(['cards', action.cardId.toString()], card => card.set('position', action.dIndex).set('column_id', action.dColId));

            return {
                ...state,
                entities: e
            };

        case types.CARD_MOVE_FAILED:
            const e2 = state
                .entities
                .setIn(['cards', action.cardId, 'position'], action.sIndex)
                .deleteIn(['columns', action.dColId.toString(), 'cards', action.dIndex])
                .updateIn(['columns', action.sColId.toString(), 'cards'], (cards) => cards.insert(action.sIndex, parseInt(action.cardId, 10)));

            return {
                ...state,
                entities: e2
            };

        case types.CARD_REMOVE:
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default table;