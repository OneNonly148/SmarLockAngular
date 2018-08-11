import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { DataLog } from '../app/datalog';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: DataLog[];
  data: any;
  loggedIn: boolean = false;
  user: any;
  private itemDoc: AngularFirestoreDocument<any[]>;
  constructor(
    private db: AngularFirestore,
    public fbAuth: AngularFireAuth,
    public router: Router,
    public route: ActivatedRoute,
  ){}
  ngOnInit(){
    this.getDatas();
  }
  title = 'app';

  getDatas(): void {
    this.data = this.db.collection('users').valueChanges();
  }

  updateUser(){
    this.user = this.fbAuth.auth.currentUser;
    console.log(this.user.uid);
    if(this.user.uid){
      this.loggedIn = true;
      console.log(this.loggedIn);
    };
  }

  dashboard(){
    this.router.navigate(['/dashboard', {id: this.user.uid}]);
  }

  logOut(){
    console.log("Logging Out");
    this.fbAuth.auth.signOut();
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
}
