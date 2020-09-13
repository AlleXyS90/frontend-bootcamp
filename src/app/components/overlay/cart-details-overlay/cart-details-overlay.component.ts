import {Component, Inject} from '@angular/core';
import {OverlayRef} from '@angular/cdk/overlay';
import {ReplaySubject} from 'rxjs';
import {CART_DISPOSE_NOTIFIER} from '../../../services/overlay/cart-overlay.model';
import {cartDetailsLeft, cartDetailsRight} from './cart-details-overlay.animation';
import {AnimationEvent} from '@angular/animations';

@Component({
  selector: 'app-cart-overlay',
  templateUrl: 'cart-details-overlay.component.html',
  styleUrls: ['cart-details-overlay.component.scss'],
  animations: [cartDetailsLeft, cartDetailsRight]
})
export class CartDetailsOverlayComponent {

  shown = true;

  constructor(private overlayRef: OverlayRef, @Inject(CART_DISPOSE_NOTIFIER) private notificationSubject: ReplaySubject<any>) {
  }

  closeCartOverlay(): void {
    this.shown = false;

  }

  handleEvent(event: AnimationEvent): void {
    if (event.toState === 'hidden') {
      this.sendCloseNotification();
    }
  }

  private sendCloseNotification(): void {
    this.notificationSubject.next(true);
    this.notificationSubject.complete();
  }
}

