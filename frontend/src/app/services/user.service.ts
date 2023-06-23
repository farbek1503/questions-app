import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	
  constructor(private http: HttpClient) { }
	
	baseURL: string = 'https://questions-app-server.vercel.app'

	getMyAnswers(token:any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Beazer ${token}`
		})
		return this.http.get(`${this.baseURL}/my-answers`, { headers })
	}
	
	getMyQuestion(token:any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Beazer ${token}`
		})
		return this.http.get(`${this.baseURL}/my-questions`, { headers })
	}
	
	infoUser(id:any){
		return this.http.get(`${this.baseURL}/info-user/${id}`)
	}
}
