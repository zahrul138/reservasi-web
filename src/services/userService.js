import { API_BASE_URL } from "./apiConfig.js";

const USER_API_URL = `${API_BASE_URL}/api/user`;

export const getAllUsers = async () => {
  const response = await fetch(USER_API_URL);
  return await response.json();
};

export const getUserById = async (id) => {
  const response = await fetch(`${USER_API_URL}/${id}`);
  return await response.json();
};

export const createUser = async (user) => {
  const response = await fetch(USER_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await response.json();
};

export const updateUser = async (id, user) => {
  await fetch(`${USER_API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
};

export const deleteUser = async (id) => {
  await fetch(`${USER_API_URL}/${id}`, {
    method: "DELETE",
  });
};