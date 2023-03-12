// @ts-nocheck
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Repositorie } from 'src/app/model/repositorie';
import { User } from 'src/app/model/user';
import { RepositorieService } from 'src/app/services/repositorie/repositorie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private repositorieServive: RepositorieService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.toastr.toastrConfig.positionClass = 'toast-bottom-center';
  }

  showModal: boolean;

  user: User = {
    name: '',
    login: '',
    avatar_url: '',
    location: ''
  }

  repositories: Repositorie[]


  login = new FormGroup({
    userName: new FormControl('', Validators.minLength(1)),
  });

  getUserName(): void {
    if (this.login.valid) {
      this.userService.getUserName(this.login.controls.userName.value).subscribe(data => {
        this.user = data;
        this.showModal = true;
      }, ex => {
        this.toastr.error(ex.error.message);
      })
      this.clear();
    }
  }

  getRepositories(): void {
    this.repositorieServive.getRepositories(this.user.login).subscribe(data => {
      this.repositories = data;
    })
  }

  clear(): void {
    this.repositories = null;
    this.login.reset();
  }

  disabledField(): boolean {
    return !this.login.valid;
  }
}