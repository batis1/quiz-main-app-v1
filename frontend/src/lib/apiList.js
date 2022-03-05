export const server = "https://hsk4pre.herokuapp.com";

const apiList = {
  signup: `${server}/user/signup`,
  login: `${server}/user/login`,
  user: `${server}/user`,
  score: `${server}/score`,
  questions: `${server}/questions`,
  words: `${server}/words`,
  lessons: `${server}/lessons`,
};

export default apiList;
