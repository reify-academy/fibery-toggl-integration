import Ajv from "npm:ajv@^8.12.0";
const ajv = new Ajv.default();

export default function validate(
  schema: Record<string, unknown>,
  data: Record<string, unknown>
) {
  const validator = ajv.compile(schema);
  const valid = validator(data);
  if (!valid) {
    throw new Error(
      validator.errors
        ?.map(
          (e) => `Prop:${e.instancePath} with data:${e.data} -> ${e.message}`
        )
        .join(", ")
    );
  }
  return data;
}
