import axios from "axios";

export const Base_url = import.meta.env.VITE_BASE_URL;

export const axiosInstance =  axios.create({
    baseURL: Base_url,
    withCredentials: true
});

export const uiState = {
    loading: false,
    successMsg: null,
    errorMsg: null
}

export const handleOnPending = (state) => {
    state.loading = true,
    state.successMsg = null,
    state.errorMsg = null
};

export const handleOnReject = (state, action) => {
    state.loading = false,
    state.successMsg = null,
    state.errorMsg = action.payload
}