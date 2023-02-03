

export const millisToHourMinuteSecond = (millis) => {
  const seconds = Math.floor(millis / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return {
    hours: hours,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
};

export const millisToHourMinuteSecondString = (millis) => {
  const hms = millisToHourMinuteSecond(millis);
  return `${hms.hours}:${hms.minutes}:${hms.seconds}`;
};

export const hourMinuteSecondToMillis = (hms) => {
  return hms.hh * 3600000 + hms.mm * 60000 + hms.ss * 1000;
};

export const hmsToMillis = (hh, mm, ss) => {
  return hh * 3600000 + mm * 60000 + ss * 1000;
};

export const getDatas = (setData, url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setData(data.data);
      console.log(data.data);
    });
};

export const postDatas = async (data, url) => {
    let resp = {};
    await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
       resp = data;
      })
      return resp;
}

export const getProfil = () => {
  return JSON.parse(localStorage.getItem("profil"));
}

export const getTokenExpirationDate = () => {
  const profil = getProfil();
  const splits = profil.expirationDate.split(" ");
  const yearSplits = splits[0].split("-");
  const timeSplits = splits[1].split(":");
  const year = yearSplits[0];
  const month = yearSplits[1] - 1;
  const day = yearSplits[2];
  const hour = timeSplits[0];
  const minute = timeSplits[1];
  const second = timeSplits[2];
  return new Date(year, month, day, hour, minute, second);
}