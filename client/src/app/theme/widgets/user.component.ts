import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';
import { debounceTime, tap } from 'rxjs/operators';
import { User } from '@core/authentication/interface';

@Component({
  selector: 'app-user',
  template: `
    <button
      class="matero-toolbar-button matero-avatar-button"
      mat-button
      [matMenuTriggerFor]="menu"
    >
      <img class="matero-avatar" [src]="user.avatar" width="32" alt="avatar" />
      <span class="matero-username" fxHide.lt-sm>User</span>
    </button>

    <mat-menu #menu="matMenu">
      <button mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>{{ 'user.logout' | translate }}</span>
      </button>
    </mat-menu>
  `,
})
export class UserComponent implements OnInit {
  user: User;

  constructor(
    private router: Router,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.auth
      .user()
      .pipe(
        tap((user) => (this.user = user)),
        debounceTime(10)
      )
      .subscribe(() => this.cdr.detectChanges());
  }

  logout() {
    this.auth
      .logout()
      .subscribe(() => this.router.navigateByUrl('/auth/login'));
  }
}
