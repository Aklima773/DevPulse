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

export type Issues ={
    id: number,

    reporter_id: number,

    title:string,
    description:string,
    type:string,
    status:string,

    created_at: Date,
    updated_at:Date
}