const axios = require("axios");

async function recupererClientsAtlas() {
  const payload = new URLSearchParams();

  payload.append("draw", "1");

  const columns = [
    "state",
    "reseller",
    "name",
    "notes",
    "ExpDate",
    "ActiveCode",
    "user_ip",
    "channelName",
    "action"
  ];

  columns.forEach((col, i) => {
    payload.append(`columns[${i}][data]`, col);
    payload.append(`columns[${i}][name]`, "");
    payload.append(`columns[${i}][searchable]`, "true");
    payload.append(`columns[${i}][orderable]`, i === 8 ? "false" : "true");
    payload.append(`columns[${i}][search][value]`, "");
    payload.append(`columns[${i}][search][regex]`, "false");
  });

  payload.append("order[0][column]", "0");
  payload.append("order[0][dir]", "asc");
  payload.append("start", "0");
  payload.append("length", "500");
  payload.append("search[value]", "");
  payload.append("search[regex]", "false");

  const response = await axios.post(
    "https://atlaspro.one/ajax/manage/lines",
    payload,
    {
      headers: {
        "Cookie": process.env.ATLAS_COOKIE,
        "Origin": "https://atlaspro.one",
        "Referer": "https://atlaspro.one/manage/lines",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36"
      }
    }
  );

  return response.data.aaData || [];
}

module.exports = {
  recupererClientsAtlas
};