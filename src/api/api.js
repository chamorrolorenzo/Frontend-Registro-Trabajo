// BASE URL
const BASE_URL = "https://backend-registro-trabajo.onrender.com";

// ⭐ AGREGADO — puente hacia React (loader global)
let setGlobalLoading = () => {};

export const setLoadingHandler = (fn) => {
  setGlobalLoading = fn;
};

// REQUEST CENTRAL
async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };
  // ⭐ tiempo mínimo visible
  const startTime = Date.now();

  // ⭐ AGREGADO — prende loader global
  setGlobalLoading(true);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      let error;
      try {
        error = await response.json();
      } catch {
        error = { message: "Request failed" };
      }
      throw error;
    }

    return await response.json();

  } finally {
    // ⭐ AGREGADO — apaga loader siempre
    // ⭐ asegura mínimo 400ms visible
    const elapsed = Date.now() - startTime;
    const delay = Math.max(400 - elapsed, 0);

    setTimeout(() => {
      setGlobalLoading(false);
    }, delay);
  }
}

// API METHODS
const api = {
  get: (endpoint) => request(endpoint),

  post: (endpoint, body) =>
    request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (endpoint, body) =>
    request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: (endpoint) =>
    request(endpoint, {
      method: "DELETE",
    }),
};

export default api;