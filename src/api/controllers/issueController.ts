
import {type Request, type Response } from "express";
import issueService from "../services/issue.service";



export const createIssue = async (req: any, res: Response) => {
    console.log("Logged in user:", req.user);
  try {
    const { title, description, type } = req.body;
    const reporter_id = req.user.id; 


    if (!title || !description || !type) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newIssue = await issueService.createIssue({
      title,
      description,
      type,
      reporter_id
    });

    return res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: newIssue
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
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

    return res.status(200).json({
      success: true,
      message: "Issues retrieved successfully",
      data: issues,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getIssueById = async (req: Request, res: Response) => {
  try {
    const issueId = Number(req.params.id);


    if (isNaN(issueId)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid issue ID format" 
      });
    }

    const issue = await issueService.getIssueById(issueId);

    if (!issue) {
      return res.status(404).json({ 
        success: false, 
        message: "Issue not found" 
      });
    }

    return res.status(200).json({
      success: true,
      message: "Issue retrieved successfully",
      data: issue
    });
  } catch (error: any) {
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};