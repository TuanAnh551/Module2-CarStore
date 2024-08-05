export const numberToVND = (number: number) => {
  return number.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
};
