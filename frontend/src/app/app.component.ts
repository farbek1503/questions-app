import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	theme:string = 'light'
	
	ngOnInit(): void {
		if(!localStorage.getItem('theme')){
			localStorage.setItem('theme', 'light')
		}else if (localStorage.getItem('theme') == 'light'){
			this.theme = 'light'
		}else if (localStorage.getItem('theme') == 'dark'){
			this.theme = 'dark'
		}
	}
	
}
