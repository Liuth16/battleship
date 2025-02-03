export default function ship(length) {
  if (typeof length !== "number" || length <= 0) {
    throw new Error("Enter a number greater than 0");
  }
  let timesHit = 0;
  let sunk = false;

  function hit() {
    timesHit += 1;
  }

  function isSunk() {
    if (timesHit >= length) {
      sunk = true;
    }
    return sunk;
  }
  return {
    length,
    get timesHit() {
      return timesHit;
    },
    get sunk() {
      return sunk;
    },
    hit,
    isSunk,
  };
}
