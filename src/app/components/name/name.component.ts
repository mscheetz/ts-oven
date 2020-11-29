import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.sass', '../oven/oven.component.sass']
})
export class NameComponent implements OnInit {
  @Input() name: string;
  appName: string;
  @Output() nameEvent = new EventEmitter<string>();

  constructor(private msgSvc: MessageService) { }

  ngOnInit(): void {
    this.appName = this.name;
  }

  nextStep() {
    if(this.appName === null || this.appName === "" || this.appName.match(/^ *$/) !== null) {
      this.msgSvc.add({
          severity: 'warn', 
          summary: 'Project Name Missing', 
          detail: 'Please enter a project name.'
        });
        this.appName = "";
        document.getElementById("app-name").focus();
        return;
    }
    this.nameEvent.emit(this.appName);
  }
}
