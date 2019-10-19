export const reorder = (stages, start, end) => {
  const newstages = stages.map(data => {
    if (start < end && data.index <= end && data.index > start) {
      return {
        ...data,
        index: data.index - 1,
      };
    }
    if (end < start && data.index >= end && data.index < start) {
      return {
        ...data,
        index: data.index + 1,
      };
    }
    if (data.index === start) {
      return {
        ...data,
        index: end,
      };
    }
    return {
      ...data,
    };
  });
  newstages.sort((a, b) => (a.index > b.index ? 1 : -1));
  return newstages;
};
