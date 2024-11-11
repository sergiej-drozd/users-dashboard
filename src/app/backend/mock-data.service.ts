import { Injectable } from "@angular/core";
import { HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, map, of, throwError } from "rxjs";
import { mockedUsers } from "./constants";
import { User } from "../features/users/models/user.model";

@Injectable({
	providedIn: "root",
})
export class MockDataService {
	constructor() {
		this.initializeDatabase();
	}

	private initializeDatabase() {
		if (!localStorage.getItem("users")) {
			localStorage.setItem("users", JSON.stringify(mockedUsers));
		}
	}

	private verifyAuth(req: HttpRequest<any>): Observable<boolean> {
		const authToken = localStorage.getItem("backendAuthToken");
		const isAuthorized =
			authToken && req.headers.get("Authorization") === `Bearer ${authToken}`;

		return isAuthorized
			? of(true)
			: throwError(() => new Error("Unauthorized"));
	}

	private authenticate(
		req: HttpRequest<any>
	): Observable<HttpResponse<any>> | null {
		const { username, password } = req.body;
		const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
		const user = users.find(
			(u) => u.name === username && u.password === password
		);

		if (user) {
			const token = Date.now().toString(36);
			localStorage.setItem("backendAuthToken", token);
			return of(
				new HttpResponse({
					status: 200,
					body: { token, user },
				})
			);
		}
		return throwError(() => new Error("Invalid username or password"));
	}

	private getUsers(
		req: HttpRequest<any>
	): Observable<HttpResponse<any>> | null {
		return this.verifyAuth(req).pipe(
			map(() => {
				const users = JSON.parse(localStorage.getItem("users") || "[]");
				return new HttpResponse({ status: 200, body: users });
			})
		);
	}

	private updateUser(
		req: HttpRequest<any>
	): Observable<HttpResponse<any>> | null {
		return this.verifyAuth(req).pipe(
			map(() => {
				const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
				const updatedUser = req.body as User;
				const userIndex = users.findIndex((u) => u.id === updatedUser.id);

				if (userIndex > -1) {
					users[userIndex] = { ...users[userIndex], ...updatedUser };
					localStorage.setItem("users", JSON.stringify(users));
					return new HttpResponse({ status: 200, body: updatedUser });
				}
				throw new Error("User not found");
			})
		);
	}

	private logout(req: HttpRequest<any>): Observable<HttpResponse<any>> | null {
		localStorage.removeItem("backendAuthToken");
		return of(new HttpResponse({ status: 200 }));
	}

	getMockResponse(req: HttpRequest<any>): Observable<HttpResponse<any>> | null {
		if (req.url.endsWith("/auth/login") && req.method === "POST") {
			return this.authenticate(req);
		} else if (req.url.endsWith("/auth/logout") && req.method === "POST") {
			return this.logout(req);
		} else if (req.url.endsWith("/users") && req.method === "GET") {
			return this.getUsers(req);
		} else if (
			req.url.match(/\/users\/[0-9a-fA-F\-]{36}$/) &&
			req.method === "PUT"
		) {
			return this.updateUser(req);
		}
		return null;
	}
}
