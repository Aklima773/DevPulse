// routes/issueRoutes.ts
import { Router } from "express";
import { createIssue, getAllIssues, getIssueById } from "../controllers/issueController";
import { authorizeRole } from "../../middlewear/roleAuth";
import { auth } from "../../utils/auth";


const router = Router();

router.get("/issues", getAllIssues);
router.get("/issues/:id", getIssueById);

router.post(
  "/issues", 
  auth, 
  authorizeRole("contributor", "maintainer"), 
  createIssue
);


export default router;