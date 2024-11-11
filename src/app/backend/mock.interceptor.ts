import { Injectable, inject } from "@angular/core";
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { MockDataService } from "./mock-data.service";
import { catchError } from "rxjs/operators";
import { randomDelay, throwErrorWithDelay } from "../utils/operators";

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
	mockDataService = inject(MockDataService);

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const mockResponse = this.mockDataService.getMockResponse(req);
		return mockResponse
			? mockResponse.pipe(
					randomDelay(),
					catchError((error) => throwErrorWithDelay(error.message))
			  )
			: next.handle(req);
	}
}
