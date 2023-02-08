import { Handler } from "./dev_deps.ts";

export const testRoute = (routes: Handler, path: string) => {
  const options = {
    localAddr: { hostname: "localhost", port: 8080, transport: "tcp" as const },
    remoteAddr: {
      hostname: "localhost",
      port: 8080,
      transport: "tcp" as const,
    },
  };
  return routes(new Request("http://localhost:8080" + path), options);
};
