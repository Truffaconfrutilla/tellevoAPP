import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public userName: String = "";

  constructor(private userService: UserService,) {}

  ngOnInit() {
    this.userService.checkLogin()
    this.getUserName()
  }

  async getUserName(){
    const user = await this.userService.getUserData()
    if (user){
      this.userName = user?.name
    }
  }
}
