import { Component, OnInit } from '@angular/core';
import { Recordatorio } from './recordatorio';
import { RecordatorioService } from './recordatorio.service';

@Component({
  selector: 'app-recordatorios',
  templateUrl: './recordatorios.component.html',
  styleUrls: ['./recordatorios.component.css']
})
export class RecordatoriosComponent implements OnInit {

  recordatorios: Recordatorio[];

  constructor(public recordatorioService: RecordatorioService) { }

  ngOnInit(): void {
    this.recordatorioService.getRecordatorios().subscribe((data: any) => {
      this.recordatorios = data;
    })
  }

}
