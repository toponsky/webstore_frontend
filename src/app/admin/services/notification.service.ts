import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  config: MatSnackBarConfig = {
    duration: 4000
  };

  constructor(public snackBar: MatSnackBar) {

  }

  showSuccessMsg(msg) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, '', this.config);
  }

  showWarnMsg(msg) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, '', this.config);
  }

  showFailMsg(msg) {
    this.config['panelClass'] = ['notification', 'fail'];
    this.snackBar.open(msg, '', this.config);
  }
}
