const STEP = 65536;

export default (state, dColumnId, dIndex, cardId = null) => {
    const cards = state.getIn([
        'columns',
        dColumnId,
        'cards'
    ]);

    const prev = dIndex > 0 && state.getIn([
        'cards',
        cards.get(dIndex - 1).toString(),
        'pos'
    ]);

    const next = dIndex < cards.count()
        ? state.getIn([
            'cards',
            cards.get(dIndex).toString(),
            'pos'
        ])
        : -1;


    const curr = cardId
        ? state.getIn([
            'cards',
            cardId,
            'pos'
        ])
        : -1;

    if (next === -1) {
        if (curr && prev < curr) {
            return curr;
        } else {
            return prev + STEP
        }
    } else {
        if (curr !== -1 && (prev < curr && curr < next)) {
            return curr;
        } else if (prev >= 0) {
            return (next + prev) / 2;
        } else {
            return next / 2;
        }

    }
}