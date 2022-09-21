import express from "express";
import {
  getAllReferences,
  createReference,
  getReference,
  deleteReference,
} from "../controllers/reference";

const router = express.Router();

router.get("/references", getAllReferences);

router.post("/reference", createReference);

router.get("/reference/:id", getReference);

router.delete("/reference/:id", deleteReference);

export default router;
