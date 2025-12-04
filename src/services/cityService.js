import * as httpRequest from '~/utils/httpRequest';
import { deleteRequest } from '~/utils/httpRequest';

/** --- READ --- */
// Lấy danh sách tất cả thành phố
export const getCities = async () => {
  try {
    const res = await httpRequest.get('/City');
    return res.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};

// Lấy thành phố theo ID
export const getCityById = async (cityID) => {
  try {
    const res = await httpRequest.get(`/City/${cityID}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching city ID=${cityID}:`, error);
    return null;
  }
};

// Lấy danh sách thành phố theo countryID
export const getCitiesByCountry = async (countryID) => {
  if (!countryID) return [];
  try {
    const res = await httpRequest.get(`/City/byCountry/${countryID}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching cities for countryID=${countryID}:`, error);
    return [];
  }
};

/** --- CREATE --- */
export const createCity = async (city) => {
  try {
    const res = await httpRequest.post('/City', city);
    return res.data;
  } catch (error) {
    console.error('Error creating city:', error);
    return null;
  }
};

/** --- UPDATE --- */
export const updateCity = async (cityID, city) => {
  try {
    const res = await httpRequest.put(`/City/${cityID}`, city);
    return res.data;
  } catch (error) {
    console.error(`Error updating city ID=${cityID}:`, error);
    return null;
  }
};

/** --- DELETE --- */
export const deleteCity = async (cityID) => {
  try {
    await httpRequest.deleteRequest(`/City/${cityID}`);
    return true;
  } catch (error) {
    console.error(`Error deleting city ID=${cityID}:`, error);
    return false;
  }
};
