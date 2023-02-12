import { assertEquals, assertThrows } from "./dev_deps.ts";
import validate from "./validator.ts";

Deno.test("passes valid data", () => {
  const schema = {
    type: "object",
    properties: {
      name: { type: "string" },
    },
  };
  const data = { name: "John" };
  const res = validate(schema, data);
  assertEquals(res, data);
});

Deno.test("throws error on invalid data", () => {
  const schema = {
    type: "object",
    properties: {
      name: { type: "string" },
    },
  };
  const data = { name: 1 };
  assertThrows(() => validate(schema, data));
});
