import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../../services/router.service';
import { QuestionService } from '../../services/question.service';
import { UserService } from '../../services/user.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables)

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
	isUser:any
	questionUser:any
	
	question:any
	createdAt:any
	questionEmail:any
	answers:any[] = []
	
	firstName:any
	lastName:any
	email:any
	
	trueAnswerUser:number = 0
	falseAnswerUser:number = 0
	
	correctAnswerData:any[] = []
	wrongAnswerData:any[] = []
	
  constructor(private acRoute: ActivatedRoute, private userSer: UserService, private quesSer: QuestionService, private routeSer: RouterService) { }
	
  ngOnInit(): void {
		this.acRoute.queryParams.subscribe((params) => {
			const question = params['question']
			const user = params['user']
			
			if(question){
				this.quesSer.infoQuestion(question, localStorage.getItem('token')).subscribe((res:any) => {
					this.question = res.data.question
					this.createdAt = res.data.createdAt
					this.questionEmail = res.data.user.email
					this.questionUser = res.data.user._id
					this.isUser = res.userId
					this.answers = res.data.answers
					
					this.correctAnswerData = res.data.correctAnswer
					this.wrongAnswerData = res.data.wrongAnswer
				})
				}else if (user){
				this.userSer.infoUser(user).subscribe((res:any) => {
					this.firstName = res.data.firstName
					this.lastName = res.data.lastName
					this.email = res.data.email
					
					res.data.questions.filter((answer:any) => {
						if(answer.is_correct == true){
							this.trueAnswerUser++
						}
						if(answer.is_correct == false){
							this.falseAnswerUser++
						}
					})
				})
			}
		})
	}
	
}
