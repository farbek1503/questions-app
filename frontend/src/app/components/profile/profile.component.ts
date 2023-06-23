import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RouterService } from '../../services/router.service';
import { Chart, registerables } from 'chart.js';
import Swal from 'sweetalert2';
import {
  Tab,
	Collapse,
  initTE,
} from "tw-elements";

Chart.register(...registerables)

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	myData:any[] = []
	myAnswers:any[] = []
	myQuestions:any[] = []
	
	trueAnswer:number = 0
	falseAnswer:number = 0
	
	correctEmail:any
	wrongEmail:any
	
	canvas: any;
	ctx: any;
	@ViewChild('mychart') mychart: any;
	
  constructor(private userSer: UserService, private routeSer: RouterService) {}
	
  ngOnInit(): void {
		initTE({ Tab, Collapse });
		this.userSer.getMyQuestion(localStorage.getItem('token')).subscribe((res:any) => {
			this.myQuestions = res.data
		})
		this.userSer.getMyAnswers(localStorage.getItem('token')).subscribe((res:any) => {
			this.myData = res.data
			this.myAnswers = res.data[0].questions
			res.data[0].questions.filter((result:any) => {
				if(result.is_correct == true){
					this.trueAnswer++
					}else{
					this.falseAnswer++
				}
			})
			
			if(this.trueAnswer != 0 || this.falseAnswer != 0){
				this.canvas = this.mychart.nativeElement;
				this.ctx = this.canvas.getContext('2d');
				
				new Chart(this.ctx, {
					type: 'doughnut',
					data: {
						labels: [
							'True Answer',
							'False Answer',
						],
						datasets: [{
							data: [this.trueAnswer, this.falseAnswer],
							backgroundColor: [
								'green',
								'red'
							],
							hoverOffset: 4
						}]
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						elements: {
							line: {
								borderWidth: 0,
								borderColor: 'rgba(0, 0, 0, 0)'
							},
							point: {
								borderWidth: 1,
								borderColor: 'rgba(0, 0, 0, 0)'
							},
							arc: {
								borderWidth: 0,
								borderColor: 'rgba(0, 0, 0, 0)'
							}
						},
						plugins: {
							legend: {
								labels: {
									font: {
										size: 18,
										family: 'Merriweather, sans-serif'
									},
									color: '#9ca3af'
								}
							}
						}
					}
				});
			}
		})
	}
	
	infoUser(id:any){
		this.routeSer.infoUser(id)
	}
	
}
