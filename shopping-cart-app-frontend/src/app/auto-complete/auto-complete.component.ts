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
  @Input() callbackFunction: ((args: any) => void) | undefined;
  public listShown: boolean = true;
  public items: Observable<any[]> | undefined; 
  public numOfItems = 0; 
  private searchTerms = new Subject<string>();  
  public ItemName: string = '';
  public selectedIndex = -1;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.endPoint = this.endPoint;
    this.searchTerms
      .pipe(
        debounceTime(300), // wait for 300ms pause in events
        distinctUntilChanged(), // ignore if next search term is same as previous 
        switchMap(async (term) => term // switch to new observable each time 
        ? this.searchService.search(this.convertStringToJSON(term)) // return the http search observable  
        : of<any[]>([])), // or the observable of empty heroes if no search term  
        catchError(error => {
          console.log(error); // temp error handling  
          return of<any[]>([]);
        })
      ).subscribe(items =>  {
        this.items = items as Observable<any[]> // save result in variable
        this.items.subscribe(itemsObjectArr => { // get count of items that were recieved for keyboard use
          this.numOfItems = itemsObjectArr.length;
        });
      });
  }

  convertStringToJSON(term: string): JSON {
    const termJSONString = '{ "search": "' + term + '" }';
    return JSON.parse(termJSONString);
  }

  onKeyPress(event: KeyboardEvent) {
    if (this.listShown) {
      switch(event.key) {
        case 'Enter': {
          this.toggleListDisplay(0);
          return;
        }
        case 'ArrowDown': {
          // make sure the list is shown
          this.listShown = true;
          // get current index
          this.selectedIndex = (this.selectedIndex + 1) % this.numOfItems;
          return;
        }
        case 'ArrowUp': {
          // make sure the list is shown
          this.listShown = true;
          // get current index
          if (this.selectedIndex <= 0) {
            // reset (last element) index to make it cycle
            this.selectedIndex = this.numOfItems;
          }
          this.selectedIndex = (this.selectedIndex - 1) % this.numOfItems;
          return;
        }
      }
    } 
    this.searchItems(this.ItemName);
  }

  onMouseEntered(index: number): void {
    this.selectedIndex = index; // update selected index if mouse if hovering on it
  }

  onSelectItem(ItemObj: any): any {
    if (this.callbackFunction && ItemObj.id) {
      this.ItemName = '';
      this.listShown = false;
      this.callbackFunction(ItemObj); // return the selected object to parent component for his logic
    } else {
      return false;
    }
  }

  searchItems(term: string): void {
    if (term) {
      this.listShown = true;
      this.searchTerms.next(term); // update search param
    } else {
      this.listShown = false;
    }
  }

  selectItem(index: number) {
    if (this.items) {
      this.listShown = false;
      this.selectedIndex = index;
      // get item from obserable array and get teh specified item from the selected index
      this.items.subscribe(itemsObjectArr => {
        this.onSelectItem(itemsObjectArr[this.selectedIndex]);
      });
    }
  }

  // show or hide the dropdown list when input is focused or moves out of focus
  toggleListDisplay(sender: number) {
    if (sender === 1) {
      this.listShown = true;
    } else {
      // helps to select item by clicking
      setTimeout(() => {
        this.selectItem(this.selectedIndex);
        this.listShown = false;
      }, 500);
    }
  }
}
