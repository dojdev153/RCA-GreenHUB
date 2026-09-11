import { roleOptions } from "../data/mockData.js";

export function routeForRole(role) {
  return roleOptions.find((item) => item.value === role)?.route ?? "/student";
}

export function shortNumber(value) {
  if (typeof value !== "number") return value;
  return new Intl.NumberFormat("en").format(value);
}
