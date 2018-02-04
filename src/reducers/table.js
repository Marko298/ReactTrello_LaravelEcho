import * as types from '../constants/ActionTypes';
import { fromJS } from 'immutable';

//Predefined table because of compatibility
const initialState = {
    isLoading: false,
    entities:  fromJS({
        columns: {},
        tables:  {
            1: {
                id:      1,
                columns: []
            }
        }
    }),
};

// const card = (state, action) => {
//     switch (action.type) {
//         default:
//             return state;
//     }
// };

const column = (state, action) => {
    switch (action.type) {
        case types.CARD_REMOVE:
            return state.deleteIn(['cards', action.sIndex]);


        case types.CARD_ADD:
            return state.updateIn(
                ['cards'],
                (cards) => cards.insert(action.dIndex, action.cardId)
            );

        default:
            return state;
    }
};

const table = (state = initialState, action) => {
    switch (action.type) {
        case types.TABLE_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                entities:  fromJS(action.entities),
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
            const e = state.entities;
            //We overwriting first action in order to remove card from old location
            //and second to addCard card to new location
            const entities = e
                .updateIn(
                    ['columns', action.sColId],
                    col => column(col, {...action, type: types.CARD_REMOVE})
                )
                .updateIn(
                    ['columns', action.dColId],
                    col => column(col, {...action, type: types.CARD_ADD})
                );

            return {
                ...state,
                entities: entities
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