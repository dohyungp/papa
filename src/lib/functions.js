export const binning = (data = [], step) => {
  let sorted = data.slice().sort(function (a, b) {
    return a - b;
  });
  const bins = [];
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  for (let i = min; i <= max; i = i + step)
    bins.push({
      start: i,
      end: i + step,
      count: 0,
    });

  for (let i = 0; i < bins.length; i += 1)
    for (let j = 0; j < sorted.length; j += 1)
      if (sorted[j] >= bins[i].start && sorted[j] < bins[i].end)
        bins[i].count += 1;
  console.log(bins);
  return bins;
};
