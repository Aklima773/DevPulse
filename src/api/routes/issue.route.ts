// routes/issueRoutes.ts
import { Router, type Request, type Response } from "express";
import { createIssue, deleteIssue, getAllIssues, getIssueById, updateIssue } from "../controllers/issue.controller";
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

router.patch(
  "/issues/:id",
  auth,
  authorizeRole("contributor", "maintainer"),
  updateIssue
);

router.delete(
  "/issues/:id",
  auth,
  authorizeRole("maintainer"), 
  deleteIssue
);

export default router;