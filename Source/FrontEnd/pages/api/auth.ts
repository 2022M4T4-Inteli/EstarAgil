// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };

const host = process.env.HOST || "127.0.0.1";

const API = `http://${host}:4005/api/login`;
//aqui ficará todas as apis de integração com o back-end
const API_AUTH = {
  create: (data) => axios.post(API, data),
};
export default API_AUTH;