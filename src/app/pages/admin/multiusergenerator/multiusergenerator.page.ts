import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-multiusergenerator',
  templateUrl: './multiusergenerator.page.html',
  styleUrls: ['./multiusergenerator.page.scss'],
})
export class MultiusergeneratorPage implements OnInit {

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  generateRandomUsers(){
    this.userService.generateRandomUsers()
  }

}
