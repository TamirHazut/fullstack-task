import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  

@Injectable()
export class SearchService {
    public endPoint: string | undefined;  

    constructor(private http: HttpClient) { }  

    search(body: JSON) {
        if (this.endPoint) {
            return this.http.post(this.endPoint, body);
        }  
        return undefined;
    }  
}