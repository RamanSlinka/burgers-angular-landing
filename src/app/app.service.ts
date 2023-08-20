import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
  }

public  sendOrder(data: any) {
    return this.http.post('https://testologia.site/burgers-order', data)
  }

  public getOrder() {
    return this.http.get('https://testologia.site/burgers-data?extra=black')
  }

}
