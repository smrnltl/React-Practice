import { SET_MESSAGE, CLEAR_MESSAGE } from '../actions/actionTypes';
import findIndex from "lodash/findIndex";

const initialState = [];
export default function (state = initialState, action) {
    let id = 0;
    switch (action.type) {
        case SET_MESSAGE:

            const { type, msg } = action.payload;
            let obj = [];

            if (Array.isArray(msg)) {
                for (let i = 0; i < msg.length; i++) {
                    obj.push({
                        id: (Math.random()*10000),
                        type: type,
                        msg: msg[i].description
                    })
                }

                return [
                    ...state,
                    ...obj
                ];
            }
            else {
                return [
                    ...state,
                    {
                        id: (Math.random() * 10000),
                        type: type,
                        msg: msg
                    }
                ]
            }

        case CLEAR_MESSAGE:
            const index = findIndex(state, { id: action.payload });
            if (index >= 0) {
                return [...state.slice(0, index), ...state.slice(index + 1)];
            }
            return state;
        default:
            return state;
    }
}
