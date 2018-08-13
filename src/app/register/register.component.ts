import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  id: any;
  private itemDoc: AngularFirestoreDocument<any[]>;
  data: any;
  dev: number = 0;
  constructor(
    public fbAuth: AngularFireAuth,
    public db: AngularFirestore,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.itemDoc = this.db.doc<any[]>('users/'+this.id);
    this.itemDoc.valueChanges().subscribe((result) =>{
      console.log(result);
      this.data = result;
    });
  }

  ngOnInit() {}
}
