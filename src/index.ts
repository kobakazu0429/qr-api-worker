import { Hono } from "hono";
import { api } from "./routes/api";
import view from "./index.html";

const app = new Hono();

app.use("/", (c) => c.html(view));
app.route("/api", api);

export default app;
