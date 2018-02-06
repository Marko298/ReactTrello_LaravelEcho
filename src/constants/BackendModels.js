import { schema } from 'normalizr';

export const card = new schema.Entity('cards', {}, {
    processStrategy: (value, parent, key) => {
        if (!value.column_id) {
            value.column_id = parent.id
        }

        return value;
    }
});

export const column = new schema.Entity('columns', {
    cards: [card]
});

export const table = new schema.Entity('tables', {
    columns: [column]
});