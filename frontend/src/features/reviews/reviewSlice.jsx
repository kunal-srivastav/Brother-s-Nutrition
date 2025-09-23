import { createSlice } from "@reduxjs/toolkit";
import { createReview, deleteReview, getAllReviews, updateReview } from "./reviewController";
import { handleOnPending, handleOnReject, uiState } from "../utils/extraReducer";


const reviewSlice = createSlice({
    name: "review",
    initialState: {
        reviews: [],
        totalPages: 1,
        totalReviews: 0,
        ...uiState
    },
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(createReview.pending, handleOnPending)
        .addCase(createReview.fulfilled, (state, action) => {
            state.loading = false;
            const { message, newReview } = action.payload;
            state.reviews.unshift(newReview);
            state.successMsg = message;
        })
        .addCase(createReview.rejected, handleOnReject)

        .addCase(updateReview.pending, handleOnPending)
        .addCase(updateReview.fulfilled, (state, action) => {
            state.loading = false;
            const { message, updatedReview } = action.payload;

            state.reviews = state.reviews.map(r =>
                r._id === updatedReview._id ? updatedReview : r
            );

            state.successMsg = message;
        })

        .addCase(deleteReview.pending, handleOnPending)
        .addCase(deleteReview.fulfilled, (state, action) => {
            state.loading = false;
            const { message, deletedReviewId } = action.payload;
            state.reviews = state.reviews.filter(r => r._id !== deletedReviewId);
            state.successMsg = message;
        })
        .addCase(deleteReview.rejected, handleOnReject)

        .addCase(getAllReviews.pending, handleOnPending)
        .addCase(getAllReviews.fulfilled, (state, action) => {
            state.loading = false;
            const { reviews, totalPages, totalReviews } = action.payload;
            state.totalReviews = totalReviews;
            state.totalPages = totalPages;
            state.reviews = reviews;
        })
        .addCase(getAllReviews.rejected, handleOnReject)
    }
});

export default reviewSlice.reducer;