import { GET_PROFILE_DATA } from '../actions/types.js';

const initialState = {
    leads: [],
};

export default function(state=initialState, action) {
    switch (action.type) {
        case GET_PROFILE_DATA:
            return {
                ...state,
                profileData: action.payload,
            };
        // case DELETE_LEAD:
        //   return {
        //     ...state,
        //     leads: state.leads.filter((lead) => lead.id !== action.payload),
        //   };
        // case ADD_LEAD:
        //   return {
        //     ...state,
        //     leads: [...state.leads, action.payload],
        //   };
        // case CLEAR_LEADS:
        //   return {
        //     ...state,
        //     leads: [],
        //   };
        default:
            return state;
    }
}