import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class SearchBarStateStore {

    private m_searchText = new BehaviorSubject<string>("");

    public get searchText$() { return this.m_searchText.asObservable(); }

    setSearchText(value:string) {
        this.m_searchText.next(value);
    }
}