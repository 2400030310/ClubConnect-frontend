const BASE_URL = "http://localhost:8080/api/users";

// Get all users (ADMIN)
export const getAllUsers = async () => {
  const response = await fetch(`${BASE_URL}`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

// Register API
export const registerUser = async (user) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

// Login API
export const loginUser = async (user) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

// Update user API
export const updateUser = async (id, updatedUser) => {
  const response = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.message || "Failed to update user");
  }

  return data;
};


// Delete user API
export const deleteUser = async (id) => {
  const response = await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.message || "Failed to delete user");
  }

  return data;
};