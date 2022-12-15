// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };

const host = process.env.HOST || "127.0.0.1";

const API = `http://${host}:4005/api/`;
const ID = localStorage.getItem("@App:user");
//aqui ficará todas as apis de integração com o back-end
const API_VALLET = {
  create: (data) => axios.post(API+"addVallet/"+ID, data),
  get: () =>
    axios.get(API + "valletsByManager/" + ID),
  single: (vallet) =>
    axios.get(API + "valletById/" + ID + "/" + vallet),
  delete: (vallet) =>
    axios.delete(API + "deletVallets/" + ID + "/" + vallet),
  update: (vallet) =>
    axios.put(API + "deletVallets/" + ID + "/" + vallet),
  // delete: (id) => axios.delete(API, id),
};
export default API_VALLET;
