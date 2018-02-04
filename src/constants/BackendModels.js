import { schema } from 'normalizr';

export const card = new schema.Entity('cards', {});

export const column = new schema.Entity('columns', {
    cards: [card]
});

export const table = new schema.Entity('tables', {
    columns: [column]
});