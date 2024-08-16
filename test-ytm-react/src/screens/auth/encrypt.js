import CryptoJS from "crypto-js";
import { SECRETKEY } from "/config/secret";

export function encrypt(str) {
  return CryptoJS.AES.encrypt(JSON.stringify(str), SECRETKEY).toString();
}

export function decrypt(str) {
  const bytes = CryptoJS.AES.decrypt(str, SECRETKEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
