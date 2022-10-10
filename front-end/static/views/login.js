import apiUrls from "./apiUrls.js";

const login = {
  getHtml: function () {
    const loginContainer = document.createElement("div");
    loginContainer.className = "container";
    const loginLbl = document.createElement("p");
    const loginLbltxt = document.createTextNode("Login with Token");
    const lblTag = loginLbl.appendChild(loginLbltxt);

    const tokeninput = document.createElement("input");
    tokeninput.placeholder = "Token";
    tokeninput.id = "inputToken";

    const submitBtn = document.createElement("button");
    const submitBtnTxt = document.createTextNode("Submit");
    submitBtn.appendChild(submitBtnTxt);
    submitBtn.className = "submit";
    submitBtn.onclick = loginfun;

    loginContainer.appendChild(lblTag);
    loginContainer.appendChild(tokeninput);
    loginContainer.appendChild(submitBtn);
    return loginContainer;

    function loginfun () {
      const token = document.getElementById("inputToken").value;
      // const url = "https://www.eventbriteapi.com/v3/users/me/organizations/";
      console.log(apiUrls.loginUrl);

      try {
        fetch(apiUrls.loginUrl, {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }).then(res => {
          if (res.ok) {
            alert("successfully");
          } else {
            alert("Something went wrong");
          };
        }).then((data) => {
          localStorage.setItem("token", token);
          localStorage.setItem("orgId", data.organizations[0].id);
          window.location.href = `/dashboard?useid=${data.organizations[0].id}`;
        });
      } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }

    //   fetch(apiUrls.loginUrl, {
    //     method: "get",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json"
    //     }
    //   }).then(response => response.json()).then((data) => {
    //     localStorage.setItem("token", token);
    //     localStorage.setItem("orgId", data.organizations[0].id);
    //     window.location.href = `/dashboard?useid=${data.organizations[0].id}`;
    //   });
    };
  }
};

export default login;
