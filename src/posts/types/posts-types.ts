export type PostViewModel = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: Date,
}

export type PostCreateUpdateDTO = Pick<
    PostViewModel, 'title' | 'shortDescription' | 'content' | 'blogId'
>

export type PostDBModel = Omit<PostViewModel, 'id'>