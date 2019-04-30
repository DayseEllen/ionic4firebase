import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit {
  users: User[];
  constructor(private userService:UserService){}

  ngOnInit(){
    this.userService.getUsers().subscribe(res=> this.users = res);
  }

}
