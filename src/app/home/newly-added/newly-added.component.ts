import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import * as fromApp from "../../store/app.reducers";
import {ProductDisplay} from "../../store/cart/cart.reducer";
import {Store} from "@ngrx/store";
import * as ShowcaseActions from "../../store/showcase/showcase.actions";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-newly-added',
  templateUrl: './newly-added.component.html',
  styleUrls: ['./newly-added.component.css']
})
export class NewlyAddedComponent implements OnInit, OnDestroy {

  showcaseState: Observable<{ newlyAdded: ProductDisplay[], mostSelling: ProductDisplay[], interested: ProductDisplay[] }>;
  showcaseSubscription: Subscription;
  isFetched: boolean = false;//prevents fetching twice.


  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.showcaseState = this.store.select('showcase');
    this.showcaseSubscription = this.showcaseState.pipe(filter(data => data.newlyAdded.length === 0 && !this.isFetched))
      .subscribe(
        data => {
          this.store.dispatch(new ShowcaseActions.FetchNewlyAdded());
          this.isFetched = true;
        }
      );

  }

  ngOnDestroy(): void {
    if (this.showcaseSubscription != null) {
      this.showcaseSubscription.unsubscribe();
    }
  }

}
