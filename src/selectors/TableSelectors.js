import createCachedSelector from 're-reselect';
import { pass }             from "../utils/argsPasser";

export const getColumnsOrder = state => state.table.columns_order;

export const getCards = state => state.table.entities.get('cards');
export const getColumns = state => state.table.entities.get('columns');

export const getCard = createCachedSelector(
    [getCards, pass],
    (cards, id) => cards.get(id.toString()),
)(pass);

export const getColumn = createCachedSelector(
    [getColumns, pass],
    (columns, id) => columns.get(id.toString()),
)(pass);


export const getCardColumn = createCachedSelector(
    [getCard],
    card => card.get('column_id')
)(pass);

export const getCardIndex = createCachedSelector(
    [getCard],
    card => card.get('position')
)(pass);