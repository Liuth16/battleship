import ship from "./ship";

describe("Ship attributes and methods", () => {
  test("ship require a lenght greater than 0", () => {
    expect(() => ship()).toThrow(Error);
    expect(() => ship(0)).toThrow(Error);
    expect(() => ship(10)).not.toThrow(Error);
  });

  test("ship is created with correct lenght", () => {
    const cruiser = ship(4);
    expect(cruiser.length).toBe(4);
  });
  test("hit method increases ship timesHit", () => {
    const cruiser = ship(1);
    cruiser.hit();
    expect(cruiser.timesHit).toBe(1);
  });
  test("isSunk update the value and return the updated value", () => {
    const cruiser = ship(1);
    const battleCruiser = ship(4);
    cruiser.hit(1);
    battleCruiser.hit(1);
    expect(cruiser.isSunk()).toBe(true);
    expect(battleCruiser.isSunk()).toBe(false);
  });
});
