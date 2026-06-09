import type { Issue } from "../../types";
declare class IssueService {
    createIssue(data: {
        title: string;
        description: string;
        type: string;
        reporter_id: number;
    }): Promise<Issue>;
    getAllIssues(filters: {
        sort?: string;
        type?: string;
        status?: string;
    }): Promise<{
        reporter: Record<string, any> | null;
    }[]>;
    getIssueById(id: number): Promise<{
        reporter: Record<string, any> | null | undefined;
        id: number;
        title: string;
        description: string;
        type: "bug" | "feature_request";
        status: "open" | "in_progress" | "resolved";
        created_at: Date;
        updated_at: Date;
    } | null>;
    updateIssue(id: number, userId: number, userRole: string, data: {
        title?: string;
        description?: string;
        type?: string;
    }): Promise<Issue>;
    deleteIssue(id: number): Promise<boolean>;
}
declare const _default: IssueService;
export default _default;
//# sourceMappingURL=issue.service.d.ts.map