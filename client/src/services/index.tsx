import { Notifications } from "../common";

export const OTPUploader = async (otp_password: string) => {
  const response = await fetch("http://localhost:3333/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: otp_password }),
  });

  const data = await response.json();
  if (data?.success) {
    Notifications({ title: "Success", message: "200", type: "success" });
  } else {
    Notifications({
      title: "Error",
      message: "Verification Failed",
      type: "error",
    });
  }

  return data;
};
