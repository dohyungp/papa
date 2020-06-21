import qs from "qs";

export function postForm(url = "", data = {}, returnType = "raw") {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(data),
  }).then((response) => {
    if (returnType === "raw") return response.text();
    else response.json();
  });
}
