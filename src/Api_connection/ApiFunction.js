import { BASE_URL } from "./config";

export function Signupn(data) {
  return fetch(BASE_URL + "signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "allow-access-origin-control": "*",
    },
    body: JSON.stringify({
      email: data.Email,
      password: data.Password,
      confirm_password: data.Confirm_Password,
      referral_code: data.Referral_Code,
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });
}
