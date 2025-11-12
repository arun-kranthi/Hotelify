import { axiosPrivate } from "./axiosInstance";

/**
 * Posts a new review.
 * @param {object} axiosPrivate - The authenticated axios instance.
 * @param {string} userId - The ID of the user.
 * @param {object} reviewData - The ReviewCreateDto (HotelId, rating, comment)
 */
export const addReview = (axiosPrivate, userId, reviewData) => {
  return axiosPrivate.post(`/review/${userId}`, reviewData);
};