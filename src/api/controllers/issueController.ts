
import {type Response } from "express";
import issueService from "../services/issueService";



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