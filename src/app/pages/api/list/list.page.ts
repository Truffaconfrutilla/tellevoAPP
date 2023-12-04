import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  users: User[];

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  async list() {
    try {
      this.users = await this.userService.listAllUsers();
    } catch (error) {
      console.error('Error loading locations: ', error);
    }
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.list();
      event.target.complete();
    }, 2000);
  }

  ionViewWillEnter() {
    this.list()
  }

  addUser() {
    this.router.navigate(['/apiadd']);
  }

  deleteUser(email: string){
    this.userService.deleteUser(email)
  }

}
