import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AngularFirestore } from 'angularfire2/firestore';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  constructor(
    public _formBuilder: FormBuilder,
    public fbAuth: AngularFireAuth,
    public router: Router,
    public route: ActivatedRoute,
    public sideBar: AppComponent,
    private db: AngularFirestore,
  ) { }

  ngOnInit() {
    this.login = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      admin: [false]
    });
  }

  logIn(){
    console.log("Logging In");
    this.fbAuth.auth.signInWithEmailAndPassword(this.login.value.email, this.login.value.password)
      .then((data) => {
        console.log(data.user);
        console.log(data.user.uid);
        console.log("Successful login");
        this.sideBar.updateUser();
        this.router.navigate(['/dashboard', { id: data.user.uid }]);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(errorCode);
      });
  }

  signUp(){
    console.log("Signing Up");
    this.fbAuth.auth.createUserWithEmailAndPassword(this.login.value.email, this.login.value.password)
    .then((data) => {
          console.log(data.user);
          console.log("Successful sign up");
          this.db.collection('users').doc(data.user.uid).set({email: this.login.value.email,admin: this.login.value.admin});
          this.router.navigate(['/dashboard', {id: data.user.uid} ]);
        })
        .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }
}
