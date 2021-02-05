export type PaginationType = {
    current_page:number,
    first_page_url:string,
    from:number,
    last_page:number,
    last_page_url:string,
    next_page_url:string|null,
    path:string,
    per_page:string,
    prev_page_url:string|null,
    to:number,
    total:number
}

export const PaginationDefault:PaginationType = {
    current_page: 1,
    first_page_url:'',
    from:1,
    last_page:1,
    last_page_url:'',
    next_page_url:null,
    path:'',
    per_page:"10",
    prev_page_url:null,
    to:1,
    total:10
}