import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import GetRequestOptions from "../GetRequestOptions";
import Navbar from "../home/Navbar";
import "./Admin.css";

var accessKey = process.env.REACT_APP_ACCESSKEY;
// Sweetalert Custom alert
function customAlert(title, message, icon) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: `${icon}`,
    title: `${title}`,
    text: `${message}`,
  });
}

let inputKey = "";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newToken, setNewToken] = useState("Your token will appear here.");
  const [allTokensData, setAllTokensData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/get-all-tokens", GetRequestOptions("get"))
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setAllTokensData(data);
      })
      .catch((err) => {
        console.log(`error ocurred fetching all tokens from DB: ${err}`);
      });
  }, []);

  const getToken = () => {
    try {
      fetch("http://localhost:5000/api/get-token", GetRequestOptions("get"))
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data) => {
          setNewToken(data);
          customAlert(
            "Token Success",
            `You have successfully generated an exam token. Your token is ${data}. This token can only be used once.`,
            "success"
          );
        })
        .catch((err) => {
          customAlert("Oops!", "an error ocurred, try again please.", "error");
          console.log(err);
        });
    } catch (err) {
      customAlert(
        "Oops!",
        "an error ocurred, this could be due to network issues, try again please.",
        "error"
      );
      console.log(err);
    }
  };

  const login = () => {
    accessKey === inputKey
      ? setIsLoggedIn(!isLoggedIn)
      : customAlert("Wrong access key", "Your access key is wrong", "error");
  };

  return (
    <div className="frame" style={{ background: "var(--bg)" }}>
      <Navbar />
      {isLoggedIn ? (
        <div className="adminLoginCont" style={{ padding: "10px" }}>
          <h2>Welcome Admin!</h2>
          <br />
          <p>
            <b>New Token: </b>
            {newToken}
          </p>
          <br />
          <button class="status new" onClick={getToken}>
            Generate token
          </button>
          {allTokensData.length === 0 ? (
            <p>Fetching all tokens from database...</p>
          ) : (
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date Created</th>
                    <th>Token</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allTokensData.map((each, index) => {
                    return (
                      <tr key={index}>
                        <td>{each.dateCreated}</td>
                        <td>{each.token}</td>
                        <td>
                          <span
                            class={
                              each.status === "new"
                                ? "status new"
                                : "status used"
                            }
                          >
                            {each.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="adminLoginCont" style={{ padding: "10px" }}>
          <div>
            <label>Admin Access Key</label>
            <br />
            <input
              type="password"
              onChange={(e) => (inputKey = e.target.value)}
            />
            <br />
            <button class="status new" onClick={login}>
              Unlock admin
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
