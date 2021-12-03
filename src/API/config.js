import axios from "axios";

export const baseURL = "https://rickandmortyapi.com/api/";

export const API = axios.create({
  baseURL: baseURL,
});
