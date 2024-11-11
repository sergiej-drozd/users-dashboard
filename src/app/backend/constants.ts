import { User } from "../features/users/models/user.model";

export const mockedUsers: User[] = [
	{
		id: "2604f4cc-b7e7-4b51-9a82-3db79d8ef588",
		password: "test1",
		name: "admin",
		role: "admin",
	},
	{
		id: "679ca8d1-2896-4a23-9e2f-f35a5b8fea11",
		password: "test2",
		name: "userOne",
		role: "user",
	},
	{
		id: "ae9bc289-c92b-492d-b024-98d94ac59164",
		password: "test3",
		name: "userTwo",
		role: "user",
	},
];
