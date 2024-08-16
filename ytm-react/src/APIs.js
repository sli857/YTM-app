import axios from "axios";

export const SERVERURL = "http://localhost:3000";

const APIKit = axios.create({ baseURL: SERVERURL });

export default APIKit;
