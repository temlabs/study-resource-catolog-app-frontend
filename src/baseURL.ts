export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://pastebins-server.herokuapp.com"
    : "http://localhost:4000";