import axios from "axios";

const trainingApi = axios.create({
  baseURL: "http://localhost:8000/api/",
});

trainingApi.interceptors.request.use(config => {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(config.method.toUpperCase())) {
    const csrftoken = getCookie('csrftoken'); 
    if (csrftoken) { 
      config.headers['X-CSRFToken'] = csrftoken;
    }
  }
  return config;
});
trainingApi.defaults.withCredentials = true;

function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}
export const getCSRFToken = async () => {
  try {
    const response = await trainingApi.get("csrf_token/");
    const csrfToken = response.headers["x-csrf-token"];
    document.cookie = `csrftoken=${csrfToken}; path=/; Secure; SameSite=Strict; HttpOnly`;
  } catch (error) {
    console.error("Error al obtener el token CSRF:", error);
    throw error;
  }
};

export const getAllActivities = async () => {
  const res = await trainingApi.get("user/activities/");
  if (res.status === 200) {
    return res.data;
  }
}

export const getLeaderBoardList = async () => {
  const res = await trainingApi.get("leaderboard/");
  if (res.status === 200) {
    return res.data;
  }
}

export const getUserActivities = async () => {
  const res = await trainingApi.get("user/activities/");
  if (res.status === 200) {
    return res.data;
  }
}

export const getUserActivityById = async (id) => {
  try {
    const res = await trainingApi.get(`user/activities/${id}/`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getStartTraining = async (id) => {
  try {
    const res = await trainingApi.get(`user/activities/${id}/training/`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
