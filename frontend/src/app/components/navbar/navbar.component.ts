import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Collapse,
	Dropdown,
  Ripple,
  initTE,
} from "tw-elements";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	themeIcons: string = 'light_mode'
	
  constructor(private route: Router) { }
	
  ngOnInit(): void {
		if(localStorage.getItem('theme') == 'light'){
			this.themeIcons = 'dark_mode'
			}else if (localStorage.getItem('theme') == 'dark'){
			this.themeIcons = 'light_mode'
		}
		initTE({ Collapse, Dropdown, Ripple });
	}
	
	toggleTheme(){
		window.location.reload()
		if(localStorage.getItem('theme') == 'light'){
			localStorage.setItem('theme', 'dark')
			}else if (localStorage.getItem('theme') == 'dark'){
			localStorage.setItem('theme', 'light')
		}
	}
	
	logout(){
		localStorage.removeItem('token')
		this.route.navigate(['/login'])
	}
	
}
