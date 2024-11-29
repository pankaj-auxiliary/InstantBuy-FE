import _ from "lodash";

const getMessageError = (error: {
  args: { choices?: string[] };
  message: string;
  rule: string;
  field: string;
}) => {
  if (error.message === "enum validation failed" && error.rule === "enum") {
    return `Please check url ( ${
      error.field.split(".").length ? error.field.split(".")[0] : error.field
    } )`;
  }

  return error.message;
};

export const errorFinder = (error: any) => {
  if (error.response && error.response.data) {
    const e = error.response.data;

    return (e?.errors && getMessageError(e.errors[0])) || e?.message || "Error";
  }
  const e = error;
  return (e?.errors && getMessageError(e.errors[0])) || e?.message || "Error";
};

export const getSearchParams = (searchParams: URLSearchParams) => {
  let params: { [key: string]: string } = {};

  searchParams.forEach((v, k) => {
    if (!_.isUndefined(v)) {
      if (params[k]) {
        params[k] += `,${v}`;
      } else {
        params[k] = `${v}`;
      }
    }
  });

  return params;
};
