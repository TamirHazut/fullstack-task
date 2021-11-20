import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {
  @Input() public endPoint: string | undefined;
  public flag: boolean = true;
  public items: Observable<any[]> | undefined;  
  private searchTerms = new Subject<string>();  
  public ItemName = '';  

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.endPoint = this.endPoint;
    this.searchTerms.pipe(
      debounceTime(300), // wait for 300ms pause in events
      distinctUntilChanged(), // ignore if next search term is same as previous 
      switchMap(async (term) => term // switch to new observable each time 
      ? this.searchService.search(this.convertStringToJSON(term)) // return the http search observable  
      : of<any[]>([])), // or the observable of empty heroes if no search term  
      catchError(error => {
        console.log(error); // temp error handling  
        return of<any[]>([]);
      })).subscribe(items => this.items = items as Observable<any[]>);
    }

    // this.searchTerms
    // .subscribe(
    //   term => {
    //     if (term) {
    //       const termJSONString = '{ "name": "' + term + '" }';
    //       const termJSONObj = JSON.parse(termJSONString);
    //       var postRes = this.searchService.search(termJSONObj);
    //       if (postRes) {
    //         postRes.subscribe(data => {
    //           this.items = data as Observable<any[]>;
    //           console.log(this.items);
    //         })
    //       }
    //     }
    //   }
    // )

  convertStringToJSON(term: string): JSON {
    const termJSONString = '{ "search": "' + term + '" }';
    return JSON.parse(termJSONString);
  }

  searchItems(term: string): void {
    this.flag = true;
    this.searchTerms.next(term);
  }

  onSelectItem(ItemObj: any): void {
    console.log(ItemObj);
  }
}
