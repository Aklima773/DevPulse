// services/issueService.ts
import { sql } from "../../db";
import type { Issue } from "../../types";

class IssueService {


  async createIssue(data: { title: string; description: string; type: string; reporter_id: number }) {
    const { title, description, type, reporter_id } = data;

    const res = await sql`
      INSERT INTO issues (title, description, type, reporter_id)
      VALUES (${title}, ${description}, ${type}, ${reporter_id})
      RETURNING *
    `;

    return res[0] as Issue;
  }



  async getAllIssues(filters: { sort?: string; type?: string; status?: string }) {
    const { sort = "newest", type, status } = filters;


    const typeFilter = type ? sql`AND type = ${type}` : sql``;
    const statusFilter = status ? sql`AND status = ${status}` : sql``;

  
    const issues = sort === "oldest"
      ? await sql`SELECT * FROM issues WHERE 1=1 ${typeFilter} ${statusFilter} ORDER BY created_at ASC`
      : await sql`SELECT * FROM issues WHERE 1=1 ${typeFilter} ${statusFilter} ORDER BY created_at DESC`;

    if (issues.length === 0) return [];

 
    const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];

   
    const reporters = await sql`
      SELECT id, name, role FROM users WHERE id = ANY(${reporterIds})
    `;

   
    const reporterMap = new Map(reporters.map((user) => [user.id, user]));

  
    return issues.map((issue) => {
      const { reporter_id, ...issueData } = issue;
      return {
        ...issueData,
        reporter: reporterMap.get(reporter_id) || null,
      };
    });
  }



  async getIssueById(id: number) {
  
    const res = await sql`
      SELECT * FROM issues WHERE id = ${id}
    `;

  
    if (res.length === 0) return null;

const issue = res[0] as Issue;


    const userRes = await sql`
      SELECT id, name, role FROM users WHERE id = ${issue.reporter_id}
    `;

    const reporter = userRes.length > 0 ? userRes[0] : null;

  
    const {reporter_id, ...issueData } = issue;
    
    return {
      ...issueData,
      reporter
    };
  }




  async updateIssue(
  id: number, 
  userId: number, 
  userRole: string, 
  data: { title?: string; description?: string; type?: string }
) {
 
  const res = await sql`SELECT * FROM issues WHERE id = ${id}`;
  
  if (res.length === 0) {
    throw new Error("NOT_FOUND");
  }
  
  const issue = res[0] as Issue;


  if (userRole === "contributor") {
   
    if (issue.reporter_id !== userId) {
      throw new Error("FORBIDDEN_OWNERSHIP");
    }
  
    if (issue.status !== "open") {
      throw new Error("FORBIDDEN_STATUS");
    }
  }


  const title = data.title ?? issue.title;
  const description = data.description ?? issue.description;
  const type = data.type ?? issue.type;


  const updatedRes = await sql`
    UPDATE issues 
    SET title = ${title}, description = ${description}, type = ${type}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

  return updatedRes[0] as Issue;
}
}






export default new IssueService();