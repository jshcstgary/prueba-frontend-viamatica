export type User = {
	id: string;
	name: string;
	email: string;
	profileId: string;
    jwt: string;
};

export type CreateUser = {
	name: string;
	email: string;
	password?: string;
};
