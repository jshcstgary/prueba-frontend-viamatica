export type Ticket = {
	id: string;
	title: string;
	description: string;
	status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
	priority: string;
	createdAt: string;
	updatedAt: string;
	userId: string;
	assignedTo: string;
};

export type Comment = {
	id: string;
	content: string;
	createdAt: string;
	userId: string;
	ticketId: string;
};

export type Assignment = {
	id: string;
	userId: string;
	ticketId: string;
	assignedAt: string;
};
