// routes/issueRoutes.ts
import { Router, type Request, type Response } from "express";
import { createIssue, getAllIssues, getIssueById, updateIssue } from "../controllers/issue.controller";
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



export default router;