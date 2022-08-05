export const preventMinus = (e) => {
    if (e.code === 'Minus') {
        e.preventDefault();
    }
};