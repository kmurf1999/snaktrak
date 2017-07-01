let URL = null;
if (process.env.NODE_ENV === 'production') {
  URL = 'https://snaktrak.io';
} else {
  URL = 'http://localhost:8000';
}
export const SERVER_URL = URL;
// config should use named export as there can be different exports,
// just need to export default also because of eslint rules
export { SERVER_URL as default };
