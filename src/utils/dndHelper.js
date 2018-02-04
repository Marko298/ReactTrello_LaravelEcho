export const toDroppable = (id, index) => {
    return `column-${id}-${index}`;
};

export const toDraggable = (id, index) => {
    return `card-${id}-${index}`;
};
export const parseName = (item) => {
    const data = item.split('-', 3);
    return {
        id:    data[1],
        index: data[2],
    }
};

export const fromDraggable = parseName;
export const fromDroppable = parseName;

export const toId = (item) => {
    return item.split('-', 3)[1];
};

export const toIndex = (item) => {
    return parseInt(item.split('-', 3)[2], 10);
};

