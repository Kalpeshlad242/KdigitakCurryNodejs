function isValidTime(time) {
  return /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/.test(time);
}

function toMinutes(time) {
  if (!isValidTime(time)) {
    throw new Error("Invalid time format");
  }
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

exports.isTimeConflict = (startA, endA, startB, endB) => {
  const aStart = toMinutes(startA);
  const aEnd = toMinutes(endA);
  const bStart = toMinutes(startB);
  const bEnd = toMinutes(endB);

  return Math.max(aStart, bStart) < Math.min(aEnd, bEnd) && aEnd !== bStart && bEnd !== aStart;
};
