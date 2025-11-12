/**
 * Fetches the logged-in user's profile data.
 * @param {object} axiosPrivate - The authenticated axios instance.
 */
export const getProfile = (axiosPrivate) => {
  return axiosPrivate.get('/profile');
};

/**
 * Updates the logged-in user's profile data.
 * @param {object} axiosPrivate - The authenticated axios instance.
 * @param {object} profileData - The UserUpdateDto (name, email, contactNumber)
 */
export const updateProfile = (axiosPrivate, profileData) => {
  return axiosPrivate.put('/profile', profileData);
};