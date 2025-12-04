import * as httpRequest from '~/utils/httpRequest';
import { deleteRequest } from '~/utils/httpRequest';

/** --- READ --- */
// Lấy danh sách tất cả tỉnh
export const getCountries = async () => {
  try {
    const res = await httpRequest.get('/Country');
    return res.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

// Lấy thông tin tỉnh theo ID
export const getCountryById = async (countryID) => {
  try {
    const res = await httpRequest.get(`/Country/${countryID}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching country ID=${countryID}:`, error);
    return null;
  }
};

/** --- CREATE --- */
export const createCountry = async (country) => {
  try {
    const res = await httpRequest.post('/Country', country);
    return res.data;
  } catch (error) {
    console.error('Error creating country:', error);
    return null;
  }
};

/** --- UPDATE --- */
export const updateCountry = async (countryID, country) => {
  try {
    const res = await httpRequest.put(`/Country/${countryID}`, country);
    return res.data;
  } catch (error) {
    console.error(`Error updating country ID=${countryID}:`, error);
    return null;
  }
};

/** --- DELETE --- */
export const deleteCountry = async (countryID) => {
  try {
    await httpRequest.deleteRequest(`/Country/${countryID}`);
    return true;
  } catch (error) {
    console.error(`Error deleting country ID=${countryID}:`, error);
    return false;
  }
};
