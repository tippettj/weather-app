const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
// # querries by id, . querries by classname
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  // prevents browser from refreshing
  e.preventDefault();

  const location = search.value;

  // reset the messages
  messageOne.textContent = "loading ...";
  messageTwo.textContent = "";

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location + ".";
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
