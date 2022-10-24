import { Hono } from "hono";
import { z } from "zod";
import { imageSync } from "qr-image";

export const apiV1 = new Hono({ strict: false });

const schema = z.object({
  type: z.enum(["svg", "png"]).default("png"),
  ec_level: z.enum(["L", "M", "Q", "H"]).default("M"),
  margin: z
    .string()
    .default("0")
    .transform((v) => parseInt(v, 10)),
});

const MIME_TYPE = {
  png: "image/png",
  svg: "mage/svg+xml",
} as const;

apiV1.get("/*", (c) => {
  const query = c.req.query();
  const options = schema.parse(query);
  const code = imageSync(query.text, options);
  c.header("Content-Type", MIME_TYPE[options.type]);
  c.status(201);
  return c.body(code);
});
