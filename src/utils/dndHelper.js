export const toDroppable = (id, index) => {
    return `column-${id}-${index}`;
};

export const toDraggable = (id, index) => {
    return `card-${id}-${index}`;
};
export const parseName = (item) => {
    const data = item.split('-', 3);
    return {
        id:    parseInt(data[1], 10),
        index: parseInt(data[2], 10),
    }
};

export const fromDraggable = parseName;
export const fromDroppable = parseName;

export const toId = (item) => {
    return parseInt(item.split('-', 3)[1], 10);
};

export const toIndex = (item) => {
    return parseInt(item.split('-', 3)[2], 10);
};

