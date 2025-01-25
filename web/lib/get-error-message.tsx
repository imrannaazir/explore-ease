/* eslint-disable @typescript-eslint/no-explicit-any */
const getErrorMessage = (err: any) => {
  console.log(err);

  let message = "Some thing went wrong";
  if (err?.errorSources?.length) {
    message = err?.errorSources?.[0]?.message;
  } else if (err?.message) {
    message = err?.message;
  }
  return message;
};
export default getErrorMessage;
