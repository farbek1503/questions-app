import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { RouterService } from '../../services/router.service';
import Swal from 'sweetalert2';
import {
  Ripple,
  initTE,
} from "tw-elements";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	data:any[] = []
	isUser:any
	
	questionInfo:string = ''
	
  constructor(private quesSer: QuestionService, private routeSer: RouterService) { }
	
  ngOnInit(): void {
		initTE({ Ripple })
		this.quesSer.getAllQuestion(localStorage.getItem('token')).subscribe((res:any) => {
			this.data = res.data
			this.isUser = res.userId
		})
	}
	
	optionsFunc(id:any, op:any){
		if(op.value == 'null'){
			Swal.fire({
				title: 'Mark The Answer',
				icon: 'info',
				timer: 1500,
				timerProgressBar: true,
				confirmButtonText: 'OK',
			});
			}else {
			this.quesSer.solveQuestion(id, op.value, localStorage.getItem('token')).subscribe((res:any) => {
				if(res.msg == 'You Have Already Answered This Question'){
					Swal.fire({
						title: res.msg,
						icon: 'warning',
						timer: 1500,
						timerProgressBar: true,
						confirmButtonText: 'OK',
					});
					}else if (res.msg == 'My Question'){
					Swal.fire({
						title: res.msg,
						icon: 'warning',
						timer: 1500,
						timerProgressBar: true,
						confirmButtonText: 'OK',
					});
					}else {
					Swal.fire({
						title: op.value == 'true' ? 'Correct Answer' : 'Wrong Answer',
						icon: op.value == 'true' ? 'success' : 'error',
						timer: 3000,
						timerProgressBar: true,
						confirmButtonText: 'OK',
					});
				}
			})
		}
	}
	
	infoQuestion(id:any){
		this.routeSer.infoQuestion(id)
	}
	
	infoUser(id:any){
		this.routeSer.infoUser(id)
	}
	
}
