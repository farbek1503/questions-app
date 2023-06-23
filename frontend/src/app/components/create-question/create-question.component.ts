import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { QuestionService } from '../../services/question.service';
import Swal from 'sweetalert2';
import {
  Input,
  initTE,
} from "tw-elements";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {
	questionForm: FormGroup;
	errorText:any
	showAlert: boolean = false;
	
  constructor(private quesSer: QuestionService) {
		this.questionForm = new FormGroup({
      question: new FormControl("", [Validators.required]),
      a: new FormControl("", [Validators.required]),
      b: new FormControl("", [Validators.required]),
      c: new FormControl("", [Validators.required]),
      d: new FormControl("", [Validators.required]),
			aIsCorrect: new FormControl(false),
			bIsCorrect: new FormControl(false),
			cIsCorrect: new FormControl(false),
			dIsCorrect: new FormControl(false),
		});
	}
	
  ngOnInit(): void {
		initTE({ Input });
	}
	
	hideAlert(){
		setTimeout(() => {
			this.showAlert = false
		}, 3000)
	}
	
	OnSubmit() {
		const answers = [
			{ text: this.questionForm.value.a, is_correct: this.questionForm.value.aIsCorrect },
			{ text: this.questionForm.value.b, is_correct: this.questionForm.value.bIsCorrect },
			{ text: this.questionForm.value.c, is_correct: this.questionForm.value.cIsCorrect },
			{ text: this.questionForm.value.d, is_correct: this.questionForm.value.dIsCorrect },
		];
		
		if(!this.questionForm.valid){
			this.errorText = 'All fields is required'
			this.showAlert = true;
			this.hideAlert()
			return
		}
		
		const correctAnswer = answers.filter((item:any) => {
			return item.is_correct == true
		})
		if(correctAnswer.length !== 1){
			this.errorText = 'Tick One Answer'
			this.showAlert = true;
			this.hideAlert()
			return
		}
		
		const questionData = {
			question: this.questionForm.value.question,
			answers,
		};
		
		this.quesSer.createQuestion(questionData, localStorage.getItem('token')).subscribe(
			(res: any) => {
				if(res.msg == 'Exists Question'){
					this.errorText = res.msg
					this.showAlert = true
					this.hideAlert()
					}else if (res.msg == 'The Answers Should Not Be The Same'){
					this.errorText = res.msg
					this.showAlert = true
					this.hideAlert()
					}else{
					Swal.fire({
						title: 'Created Question',
						icon: 'success',
						timer: 3000,
						timerProgressBar: true,
						confirmButtonText: 'OK',
					});
				}
			},
			(err) => {
				alert("We got an error in Login...");
			}
		);
	}
}
