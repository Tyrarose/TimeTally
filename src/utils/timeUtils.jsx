import { calculateTotalTime } from "./timeUtils";

test("calculates total time correctly", () => {
  const entries = [
    { start: "09:00", end: "10:30" },
    { start: "14:00", end: "15:15" },
  ];
  const result = calculateTotalTime(entries);
  expect(result).toEqual({ totalHours: 2, totalMinutes: 45 });
});
