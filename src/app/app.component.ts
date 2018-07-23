import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { DataLog } from '../app/datalog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: DataLog[];
  data: Observable<any[]>
  constructor(private db: AngularFirestore){
  }
  ngOnInit(){
    this.getDatas();
  }
  title = 'app';

  getDatas(): void {
    this.data = this.db.collection('users').valueChanges();
  }
}
