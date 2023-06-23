import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
	toggleChecked: boolean = false

  constructor() { }

  ngOnInit(): void {
		if(localStorage.getItem('theme') == 'light'){
			this.toggleChecked = false
		}else if (localStorage.getItem('theme') == 'dark'){
			this.toggleChecked = true
		}
  }
	
	toggleTheme(){
		window.location.reload()
		if(this.toggleChecked == false){
			localStorage.setItem('theme', 'dark')
		}else if (this.toggleChecked == true){
			localStorage.setItem('theme', 'light')
		}
	}

}
