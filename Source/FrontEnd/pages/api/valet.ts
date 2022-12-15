// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };

const host = process.env.HOST || "127.0.0.1";

function getId() {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    return localStorage.getItem("@App:user");
  }
}
const API = `http://${host}:4005/api/`;
const ID = getId();
//aqui ficará todas as apis de integração com o back-end
const API_VALLET = {
  create: (data: any) => axios.post(API + "addVallet/" + ID, data),
  get: () => axios.get(API + "valletsByManager/" + ID),
  single: (vallet: string) =>
    axios.get(API + "valletById/" + ID + "/" + vallet),
  delete: (vallet: string) =>
    axios.delete(API + "deletVallets/" + ID + "/" + vallet),
  update: (vallet: any) => axios.put(API + "deletVallets/" + ID + "/" + vallet),
  // delete: (id) => axios.delete(API, id),
};
export default API_VALLET;
