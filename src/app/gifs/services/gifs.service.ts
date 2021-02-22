import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _historial: string[] = [];
  private servicioUrl = 'https://api.giphy.com/v1/gifs';
  public resultados: Gif[] = [];
  arrString = new BehaviorSubject<string[]>([]);
  private apiKey: string = 'Sp4r7Dnrz20LwHwt3yyuvSujHmrliC6b';
  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }
  buscarGifs(query: string) {
    console.log(this._historial);
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      console.log('ac');

      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);
    this.arrString.next(this._historial);
    this.http
      .get<SearchGifsResponse>(`${this.servicioUrl}/search`, {
        params,
      })
      .subscribe((resp) => {
        console.log(resp.data);

        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
  get historialxd() {
    //this._historial = this._historial.splice(0, 10);
    return localStorage.getItem('historial');
  }
}
