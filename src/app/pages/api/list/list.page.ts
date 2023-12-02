import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { FirecrudService } from 'src/app/core/services/firecrud.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  userList!: User[];

  constructor(
    private router: Router,
    private firecrud: FirecrudService
  ) { }

  ngOnInit() {
  }

  list() {
    this.firecrud.getCollection('pruebacrudadmin').subscribe((pruebacrudadmin) => {
      this.userList = pruebacrudadmin
    });
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

  addJugador() {
    this.router.navigate(['/apiadd']);
  }

}
