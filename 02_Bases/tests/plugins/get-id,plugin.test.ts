import { getUUID } from "../../src/plugins/get-id.plugin";

describe("plugins/get-id.plugin.ts", () => {
  test("getUUID should return a string length of 36 characters", () => {
    const uuid = getUUID();
    expect(typeof uuid).toBe("string");
    expect(uuid.length).toBe(36);
  });
});
