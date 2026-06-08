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
}

export default new IssueService();