const numberToArray = (num) => {
  const res = [];
  for (let i = 1; i <= num; i++) {
    res.push(i);
  }
  return res;
};

export default numberToArray;