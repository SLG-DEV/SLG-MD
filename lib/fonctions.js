
const os = require("os");

const runtime = (seconds) => {
  const J = Math.floor(seconds / (3600 * 24));
  const H = Math.floor((seconds % (3600 * 24)) / 3600);
  const M = Math.floor((seconds % 3600) / 60);
  const S = Math.floor(seconds % 60);
  return `${J > 0 ? J + " J " : ""}${H > 0 ? H + " H " : ""}${M > 0 ? M + " M " : ""}${S > 0 ? S + " S" : ""}`;
};
module.exports = { runtime };