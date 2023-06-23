import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { RouterService } from '../../services/router.service';
import {
  Input,
  Ripple,
	Alert,
  initTE
} from "tw-elements";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	errorText:any
	showAlert: boolean = false;
	
  constructor(private authSer: AuthService, private routeSer: RouterService) {
		this.registerForm = new FormGroup({
			firstName: new FormControl("", [Validators.required]),
			lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.required])
		});
	}
	
  ngOnInit(): void {
		initTE({ Input, Ripple, Alert });
	}
	
	hideAlert(){
		setTimeout(() => {
			this.showAlert = false
		}, 3000)
	}
	
	OnSubmit() {
		this.authSer.register(this.registerForm.value).subscribe(
			(res: any) => {
				if(res.msg == 'All fields is required'){
					this.errorText = res.msg
					this.showAlert = true;
					this.hideAlert()
					}else if (res.msg == 'Exists Email'){
					this.errorText = res.msg
					this.showAlert = true;
					this.hideAlert()
					}else {
					this.routeSer.home()
					localStorage.setItem('token', res.token)
				}
			},
			(err) => {
				alert("We got an error in Login...");
				}
			);
	}
	
}
