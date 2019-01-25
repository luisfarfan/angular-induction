import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { IUser } from '../../shared/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Array<IUser>;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
      // this.users = response.filter(u => u.completed);
    });
  }

  deleteUser(user: IUser): void {
    if (confirm('Esta usted seguro de eliminar este usuario')) {
      this.userService.delete(user.id).subscribe(response => {
        console.log(response);
        this.getUsers();
      });
    }
  }

  addUser(): void {
    this.router.navigate(['add']);
  }

  editUser(user: IUser): void {
    this.router.navigate([`edit/${user.id}`]);
  }

}
