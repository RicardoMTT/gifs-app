import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  arrString$: BehaviorSubject<string[]>;

  constructor(public gifsService: GifsService) {
    this.arrString$ = this.gifsService.arrString;
  }

  get historial() {
    return JSON.parse(this.gifsService.historialxd!);
  }

  buscar(item: string) {
    console.log(item);
    this.gifsService.buscarGifs(item);
  }
}
