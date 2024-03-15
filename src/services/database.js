// Client side of MySQL server connection

import axios from 'axios';

// Define base URL for API requests
const baseURL = 'http://localhost:3001/api';

// ACCOUNT TABLE:
    // Table name: accounts
      // Columns: username (string, passed in), id(integer, SQL generated), firstname(string, passed in),
      // lastname(string, passed in), email (string, passed in), password(string, passed in)

export const fetchAccountData = async () => {
  /*
    Function to fetch account data from the server
    Called like: const data = await fetchAccountData();
    data automatically in JSON format
    */
  try {
    const response = await axios.get(`${baseURL}/accounts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const fetchUsernames = async () => {
  try {
      const response = await axios.get(`${baseURL}/accounts/usernames`);
      return response.data; // Returns an array of objects with username
  } catch (error) {
      console.error('Error fetching usernames:', error);
      throw error;
  }
};
export const fetchEmails = async () => {
  try {
      const response = await axios.get(`${baseURL}/accounts/emails`);
      return response.data; // Returns an array of objects with email
  } catch (error) {
      console.error('Error fetching emails:', error);
      throw error;
  }
};
   
export const addNewAccount = async (newData) => {
   /*
    Add new account to server
    Create new object of a user, pass in params like a JSON file: 
        username: username value,
        firstname: firstname value,
        etc.
    Then pass that object into addNewAccount
    */
  try {
    const response = await axios.post(`${baseURL}/accounts`, newData);
    return response.data;
  } catch (error) {
    console.error('Error adding data:', error);
    throw error;
  }
};

export const deleteAccount = async (username) => {
  try {
      const response = await axios.delete(`${baseURL}/accounts/${username}`);
      return response.data;
  } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
  }
};
