export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://study-resource-catalog-backend.herokuapp.com"
    : "http://localhost:4000";
