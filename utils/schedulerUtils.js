function toMinutes(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

exports.isTimeConflict = (startA, endA, startB, endB) => {
  const aStart = toMinutes(startA);
  const aEnd = toMinutes(endA);
  const bStart = toMinutes(startB);
  const bEnd = toMinutes(endB);

  return Math.max(aStart, bStart) < Math.min(aEnd, bEnd);
};
