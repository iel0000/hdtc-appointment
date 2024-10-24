import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { selectRecord, UpdateAcceptedTerms } from '../store';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss'],
})
export class NoticeComponent implements OnInit, OnDestroy {
  isAcceptedTerms = false;
  private ngUnsubscribe = new Subject<void>();

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectRecord)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(s => {
        this.isAcceptedTerms = s.isAcceptedTerms;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  changeAccept(event: any) {
    this.store.dispatch(
      UpdateAcceptedTerms({ payload: <boolean>event.checked })
    );
  }

  nextPage() {
    this.router.navigate(['appointment/schedule']);
    return;
  }
}
