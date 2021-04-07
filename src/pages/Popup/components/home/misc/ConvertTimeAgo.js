/* Convert History Timestamp to Humand Readable Time ago */

function convertTimeAgo(value) {
  let strFull = '';
  const millis = Date.now() - value;

  switch (true) {
    // Seconds
    case millis < 60000:
      let seconds = ((millis % 60000) / 1000).toFixed(0);
      strFull = seconds + ' secs';
      break;

    // Minutes
    case millis >= 60000 && millis < 3600000:
      let minutes = Math.floor(millis / 60000);
      strFull = minutes + ' mins';
      break;

    // Hours
    case millis >= 3600000 && millis < 86400000:
      let hours = Math.floor(millis / 3600000);
      strFull = hours + ' hrs';
      break;

    // Days
    case millis >= 86400000 && millis < 604800000:
      let days = Math.floor(millis / 86400000);
      strFull = days + ' days';
      break;

    // Weeks
    case millis >= 604800000 && millis < 2592000000:
      let weeks = Math.floor(millis / 604800000);
      strFull = weeks + ' wks';
      break;

    // Months
    case millis >= 2592000000 && millis < 31540000000:
      let months = Math.floor(millis / 604800000);
      strFull = months + ' mnts';
      break;

    // Years
    case millis >= 31540000000 && millis < 3154000000000:
      let years = Math.floor(millis / 31540000000);
      strFull = years + ' yrs';
      break;

    default:
      strFull = 'unknown';
  }

  return strFull;
}

export default convertTimeAgo;
