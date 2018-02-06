import * as types            from '../constants/ActionTypes';
import { fromJS, List, Map } from 'immutable';

//Predefined table because of compatibility
const initialState = {
    isLoading:     false,
    entities:      new Map(),
    columns_order: new List(),
};

// const card = (state, action) => {
//     switch (action.type) {
//         default:
//             return state;
//     }
// };

// const column = (state, action) => {
//     switch (action.type) {
//         case types.CARD_MOVE:
//             if (state.get('id') === action.sColId) {
//                 return state
//             } else {
//                 return state.updateIn(
//                     ['cards'],
//                     (cards) => cards.insert(action.dIndex, action.cardId)
//                 );
//             }
//
//
//         default:
//             return state;
//     }
// };

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

        case types.CARD_MOVE:
            const entities = state
                .entities
                .setIn([
                    'cards',
                    action.cardId,
                    'pos'
                ], action.pos)
                .deleteIn([
                    'columns',
                    action.sColId,
                    'cards',
                    action.sIndex,
                ])
                .updateIn([
                    'columns',
                    action.dColId,
                    'cards'
                ], (cards) => cards.insert(action.dIndex, parseInt(action.cardId, 10)));

            return {
                ...state,
                entities: entities
            };

        case types.CARD_MOVE_FAILED:
            const e = state
                .entities
                .setIn([
                    'cards',
                    action.cardId,
                    'pos'
                ], action.old_pos)
                .deleteIn([
                    'columns',
                    action.dColId,
                    'cards',
                    action.dIndex,
                ])
                .updateIn([
                    'columns',
                    action.sColId,
                    'cards'
                ], (cards) => cards.insert(action.sIndex, parseInt(action.cardId, 10)));

            return {
                ...state,
                entities: e
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