"use server";

import { cookies } from "next/headers";

export const getAccessToken = async () => {
  const token = cookies().get("accessToken")?.value;
  return token;
};
