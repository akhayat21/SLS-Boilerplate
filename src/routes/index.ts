import type { Express } from "express";
import referenceRouter from "./reference";

function useRoutes(server: Express): void {
  server.use("/v1", referenceRouter);
}

export default useRoutes;
