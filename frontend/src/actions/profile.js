import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import API_URL from '../urls'
import { GET_PROFILE_DATA } from './types';

// GET LEADS
export const getProfileData = () => (dispatch, getState) => {
    axios
        .get(`${API_URL}/account/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_PROFILE_DATA,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// // DELETE LEAD
// export const deleteLead = (id) => (dispatch, getState) => {
//   axios
//     .delete(`/api/leads/${id}/`, tokenConfig(getState))
//     .then((res) => {
//       dispatch(createMessage({ deleteLead: 'Lead Deleted' }));
//       dispatch({
//         type: DELETE_LEAD,
//         payload: id,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// // ADD LEAD
// export const addLead = (lead) => (dispatch, getState) => {
//   axios
//     .post('/api/leads/', lead, tokenConfig(getState))
//     .then((res) => {
//       dispatch(createMessage({ addLead: 'Lead Added' }));
//       dispatch({
//         type: ADD_LEAD,
//         payload: res.data,
//       });
//     })
//     .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
// };