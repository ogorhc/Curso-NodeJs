import { httpClientPlugin } from "../../src/plugins/http-client.plugin";

describe("plugins/http-client.plugin.ts", () => {
  const url = "https://jsonplaceholder.typicode.com/todos/1";
  test("httpClientPlugin.get() should return a string", async () => {
    const data = await httpClientPlugin.get(url);
    expect(data).toEqual({
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: expect.any(Boolean),
    });
  });

  test("httpClientPlugin should have POST, PUT and DELETE methods", async () => {
    const postMethod = httpClientPlugin.post;
    const putMethod = httpClientPlugin.put;
    const deleteMethod = httpClientPlugin.delete;

    expect(typeof postMethod).toBe("function");
    expect(typeof putMethod).toBe("function");
    expect(typeof deleteMethod).toBe("function");
    await expect(httpClientPlugin.post(url, {})).rejects.toThrow(
      "Not implemented"
    );
    await expect(httpClientPlugin.put(url, {})).rejects.toThrow(
      "Not implemented"
    );
    await expect(httpClientPlugin.delete(url)).rejects.toThrow(
      "Not implemented"
    );
  });
});
