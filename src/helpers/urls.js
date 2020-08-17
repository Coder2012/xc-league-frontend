export const api =
  process.env.NODE_ENV === 'production'
    ? 'https://xc-league.herokuapp.com'
    : 'http://localhost:3000';
