export const makePass = n => (state, ...args) => args[n];
export const pass = makePass(0);
export const sPass = makePass(1);
export const tPass = makePass(2);
export const fPass = makePass(3);