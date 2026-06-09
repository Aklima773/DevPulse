
import {type Request, type Response } from "express";
import issueService from "../services/issue.service";
import { sendResponse } from "../../utils/sendResponse";



export const createIssue = async (req: Request, res: Response) => {
    console.log("Logged in user:", req.user);
  try {
    const { title, description, type } = req.body;
    const reporter_id = req.user.id; 


    if (!title || !description || !type) {
    
               return sendResponse(res,{message: "Missing required fields"},400)
    }

    const newIssue = await issueService.createIssue({
      title,
      description,
      type,
      reporter_id
    });


    
return sendResponse(
      res, 
      { message: "Issue created successfully", data: newIssue }, 
      201
    );

    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return sendResponse(res, { message: errorMessage }, 500);
  }
};

export const getAllIssues = async (req: Request, res: Response) => {
  try {
    const { sort, type, status } = req.query;

   
    const issues = await issueService.getAllIssues({
      sort: sort as string,
      type: type as string,
      status: status as string,
    });

 return sendResponse(
      res, 
      { message: "Issues retrieved successfully", data: issues }, 
      200
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return sendResponse(res, { message: errorMessage }, 500);
  }
};

export const getIssueById = async (req: Request, res: Response) => {
  try {
    const issueId = Number(req.params.id);


    if (isNaN(issueId)) {
  return sendResponse(res, { message: "Invalid issue ID format" }, 400);
    }

    const issue = await issueService.getIssueById(issueId);

    if (!issue) {
    return sendResponse(res, { message: "Issue not found" }, 404);
    }

    return sendResponse(
      res, 
      { message: "Issue retrieved successfully", data: issue }, 
      200
    );
  }catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return sendResponse(res, { message: errorMessage }, 500);
  }
};

export const updateIssue = async (req: Request, res: Response) => {
  try {
    const issueId = Number(req.params.id);
    const { title, description, type } = req.body;
    const currentUser = req.user; // Injected by auth middleware

    if (isNaN(issueId)) {
      return sendResponse(res, { message: "Invalid issue ID format" }, 400);
    }


    const updatedIssue = await issueService.updateIssue(issueId, currentUser.id, currentUser.role, {
      title,
      description,
      type
    });

    return sendResponse(
      res, 
      { message: "Issue updated successfully", data: updatedIssue }, 
      200
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "";
   
    if (msg === "NOT_FOUND") {
     return sendResponse(res, { message: "Issue not found" }, 404);
    }
    if (msg === "FORBIDDEN_OWNERSHIP") {
      return sendResponse(res, { message: "Access denied: You can only update your own issues" }, 403);
    }
    if (msg === "FORBIDDEN_STATUS") {
     return sendResponse(res, { message: "Access denied: Contributors can only update open issues" }, 403);
    }

return sendResponse(res, { message: msg }, 500);
  }
};

export const deleteIssue = async (req: Request, res: Response) => {
  try {
    const issueId = Number(req.params.id);

   
    if (isNaN(issueId)) {
 return sendResponse(res, { message: "Invalid issue ID format" }, 400);
    }

  
    await issueService.deleteIssue(issueId);

   
  return sendResponse(res, { message: "Issue deleted successfully" }, 200);

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "";
    if (msg === "NOT_FOUND") {
      return sendResponse(res, { message: "Issue not found" }, 404);
    }

    return sendResponse(res, { message: msg }, 500);
  }
};