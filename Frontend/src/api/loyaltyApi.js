/**
 * Fetches the loyalty account for a specific user.
 * @param {object} axiosPrivate - The authenticated axios instance.
 * @param {string} userId - The ID of the user.
 */
export const getLoyaltyPoints = (axiosPrivate, userId) => {
  return axiosPrivate.get(`/loyalty/${userId}/points`);
};