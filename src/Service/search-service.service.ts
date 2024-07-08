import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  private searchTextSubject = new BehaviorSubject<string>('');
  searchText$ = this.searchTextSubject.asObservable();

  setSearchText(text: string) {
    this.searchTextSubject.next(text);
  }
}