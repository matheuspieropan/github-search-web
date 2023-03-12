// @ts-nocheck
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Repositorie } from 'src/app/model/repositorie';
import { User } from 'src/app/model/user';
import { RepositorieService } from 'src/app/services/repositorie/repositorie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor(private userService: UserService, private repositorieServive: RepositorieService){}
  showModal: boolean;

  user: User = {
    name: '',
    login: '',
    avatar_url: '',
    location: ''
  }

  repositories: Repositorie[]

  
  login = new FormGroup({
    userName: new FormControl('', Validators.min(1)),
  });

  getUserName(): void {
    this.userService.getUserName(this.login.controls.userName.value).subscribe(data => {
      this.user = data;
      this.showModal = true;    
      this.repositories = null;
    })
  }

  getRepositories(): void {
    this.repositorieServive.getRepositories(this.user.login).subscribe(data => {
      this.repositories = data;
    })
  }
}