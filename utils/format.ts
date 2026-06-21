export const formatCurrency = (val: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(val);
export const formatNumber = (val: number, dec = 2) =>
  Number.isFinite(val) ? val.toFixed(dec) : (0).toFixed(dec);
