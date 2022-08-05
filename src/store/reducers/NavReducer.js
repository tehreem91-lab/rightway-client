const initialState = ['RawData'];

const NavReducer = (state = initialState, action) => {
    switch (action.type) {

        case "GET_NAV": {
            return {
                data: action.payload
            }
        }
        default:
            return state;
    }
}

export default NavReducer;