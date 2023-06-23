import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	
  constructor(private http: HttpClient) { }
	
	baseURL: string = 'https://questions-app-server.vercel.app'
	
	register(data:any){
		return this.http.post(`${this.baseURL}/register`, data)
	}
	
	login(data:any){
		return this.http.post(`${this.baseURL}/login`, data)
	}
	
	
}
