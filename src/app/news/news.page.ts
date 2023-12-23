import { Component, OnInit } from '@angular/core';
import { NewsFeedsService } from '../news-feeds.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL_Weather = environment.API_URL_Weather;
const API_Key_Weather = environment.API_Key_Weather;

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  weatherTemp: any;
  todayDate = new Date();
  articles: any;
  cityName: any;
  weatherIcon: any;
  weatherDetails: any;

  constructor(private newsService:NewsFeedsService , public httpClient:HttpClient) {
    this.loadWeather();
    this.loadNews()
   }

   loadWeather(){
    this.httpClient.get(`${API_URL_Weather}/weather?q=${"Dublin"}&appid=${API_Key_Weather}`).subscribe((results: any) => {
      console.log(results);
      this.weatherTemp = results.main
      this.cityName = results.name
      console.log(this.weatherTemp);
      this.weatherIcon = results.weather[0]
      console.log(this.weatherDetails);
      this.weatherIcon = `https://openweathermap.org/img/wn/${results.weather[0].icon}@2x.png`;
    })
   }

   loadNews(){
    this.newsService.getNews("everything?q=TU-Dublin&language=en&sortBy=relevancy&sources=the-irish-times").subscribe((news: any) => {
      this.articles = news.articles;
      console.log(this.articles);
    })
  }
  ngOnInit() {
  }
}
interface WeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
}