export const role =  ['contributor', 'maintainer'] as const

export type Role = typeof role[number]


export type User ={

    id: number,
    name: string,
    email: string,
    passwordhash: string,
    role: Role,
    created_at: Date,
    updated_at: Date
}

export type RUser = Omit<User, 'id' | 'created_at' | 'updated_at' | 'passwordhash'>

export type Issue ={
    id: number;
  title: string;
  description: string;
  type: 'bug' | 'feature_request';
  status: 'open' | 'in_progress' | 'resolved';
  reporter_id: number;
  created_at: Date;
  updated_at: Date;
}