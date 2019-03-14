import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../shared/auth.service";
import { takeWhile } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { SnotifyService } from "ng-snotify";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = true;
  alive = true;
  loginForm: FormGroup;


  getEmailErrorMessage() {
    return this.loginForm.get("email").hasError("required")
      ? "You must enter a value"
      : this.loginForm.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }

  getPasswordErrorMessage() {
    return this.loginForm.get("password").hasError("required")
      ? "You must enter a value"
      : this.loginForm.get("password").hasError("minlength")
      ? "Password should be at least 5 characters"
      : "";
  }

  constructor(private auth: AuthService, private router: Router, private snotify: SnotifyService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)])
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  onSubmit() {
    this.loginForm.disable();
    this.auth.signIn(this.loginForm.value).pipe(
      takeWhile(() => this.alive)
    )
    .subscribe(
      () => {
        this.router.navigate(['']);
      },
      (error) => {
        this.loginForm.enable();
        this.snotify.error(error.error.message, {
          timeout: 2000,
          showProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true
        });
      }
    );
  }
}
