import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
	
  constructor(private http: HttpClient) { }
	
	baseURL: string = 'https://questions-app-server.vercel.app'
	
	getAllQuestion(token:any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Beazer ${token}`
		})
		return this.http.get(`${this.baseURL}/all-question`, { headers })
	}
	
	createQuestion(data:any, token:any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Beazer ${token}`
		})
		return this.http.post(`${this.baseURL}/create-question`, data, { headers })
	}
	
	solveQuestion(qId:any, a:any, token:any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Beazer ${token}`
		})
		return this.http.get(`${this.baseURL}/solve-question/${qId}/${a}`, { headers })
	}
	
	infoQuestion(id:any, token:any){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Beazer ${token}`
		})
		return this.http.get(`${this.baseURL}/info-question/${id}`, { headers })
	}
}
