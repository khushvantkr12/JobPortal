import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { applyJobs, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router=express.Router();

router.get("/apply/:id",isAuthenticated,applyJobs);
router.get("/get",isAuthenticated,getAppliedJobs);
router.get("/:id/applicants",isAuthenticated,getApplicants);
router.post("/status/:id/update",isAuthenticated,updateStatus);
export default router;