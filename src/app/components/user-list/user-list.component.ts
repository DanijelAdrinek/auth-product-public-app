import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { User } from '../../models';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterModule ,CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  onEdit(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
  }

  onDelete(user: User): void {

    if(!user.id) { return; }
    
    this.userService.deleteUser(user.id).then(() => {
      this.users = this.users.filter(u => u.id !== user.id);
    }).catch((error: any) => {
      alert(error.message);
    });
  }

  promoteToAdmin(user: User): void {
    if (confirm(`Are you sure you want to promote ${user.name} to admin?`)) {
      this.userService.updateAdminStatus(user.id!, true).then(() => {
        alert(`${user.name} is now an admin.`);
      }).catch(error => {
        alert(`Failed to promote ${user.name} to admin: ${error.message}`);
      });
    }
  }
}