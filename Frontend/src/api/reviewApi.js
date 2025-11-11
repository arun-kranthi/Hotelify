import { axiosPrivate } from "./axiosInstance";

/**
 * Posts a new review.
 * @param {object} axiosPrivate - The authenticated axios instance.
 * @param {object} reviewData - The ReviewCreateDto (hotelId, rating, comment)
 */
export const addReview = (axiosPrivate, reviewData) => {
  // This matches your secure POST /api/review endpoint
  return axiosPrivate.post('/review', reviewData);
};