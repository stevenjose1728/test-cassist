export type User = {
    id: number,
    name: string,
	last_name: string,
	avatar?: string,
	uri?: null | string,
	code?: {
		code: string,
		created_at: string,
		deleted_at: string | null,
		id: number,
		updated_at: string,
		user_id: number
	},
	created_at:string,
	deleted_at:string,
	email:string,
	phone?:string,
	role_id?: number,
	ruc:string,
	status:number,
	status_text:string,
	updated_at:string,
	token:string
}