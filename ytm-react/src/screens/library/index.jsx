import React from "react";
import axios from "axios";
const verify = async () => {
  let res = await axios({
    method: "post",
    url: "http://127.0.0.1:3000/verify",
    withCredentials: true, // 发送凭证，包括cookies等
  });
  if (res.data.msg !== "OK") {
    window.location = "/";
  }
};
verify();

function Library() {
  return <div className="screen-container">lib</div>;
}

export default Library;
