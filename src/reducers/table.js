import * as types from '../constants/ActionTypes';
import { fromJS } from 'immutable';

const initialState = {
    columns: fromJS([
        {
            id:    1,
            cards: [
                {
                    id:   1,
                    text: 'Some card'
                },
                {
                    id:   2,
                    text: 'New card 2'
                },
                {
                    id:   3,
                    text: 'Some card 3'
                },
                {
                    id:   4,
                    text: 'Some cool card'
                }
            ],
        },
        {
            id:    2,
            cards: [
                {
                    id:   6,
                    text: 'Some strange card'
                }
            ]
        }

    ]),
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
                (cards) => cards.insert(action.dIndex, action.card)
            );

        default:
            return state;
    }
};

const table = (state = initialState, action) => {
    switch (action.type) {
        case types.CARD_ADD:
            return {
                ...state,
            };

        case types.CARD_MOVE:
            //We overwriting first action in order to remove card from old location
            //and second to add card to new location
            const columns = state
                .columns
                .updateIn(
                    [action.sColIndex],
                    col => column(col, {...action, type: types.CARD_REMOVE})
                )
                .updateIn(
                    [action.dColIndex],
                    col => column(col, {...action, type: types.CARD_ADD})
                );

            return {
                ...state,
                columns: columns,
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