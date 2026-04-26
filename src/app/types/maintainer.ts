export type Response<T> = {
	success: string;
	data: T;
};

export type Module = {
	id: string;
	name: string;
	description: string;
	active: boolean;
};

export type Option = {
	id: string;
	module_id: string;
	name: string;
	path: string;
	icon: string;
};

export type Profile = {
	id: string;
	name: string;
	description: string;
	created_at: string;
	updated_at: string;
};
