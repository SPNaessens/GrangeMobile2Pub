import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.API_URL;
const API_Key = environment.API_Key;

@Injectable({
  providedIn: 'root'
})
export class NewsFeedsService {

  constructor(private http:HttpClient) { }

  getNews(url: string){
    return this.http.get(`${API_URL}/${url}&apiKey=${API_Key}`)
  }
}
