import { Directive, OnDestroy } from '@angular/core';
import { CdkDrag, CdkDragMove } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appCenterPreview]',
  standalone: true
})
export class CenterDragPreviewDirective implements OnDestroy {
  private moveSub: Subscription;

  constructor(private drag: CdkDrag) {
    this.moveSub = this.drag.moved.subscribe((event: CdkDragMove) => {
      const preview = document.querySelector('.cdk-drag-preview') as HTMLElement;
      if (preview) {
        preview.style.transform =
          `translate(${event.pointerPosition.x - preview.offsetWidth / 2}px, ` +
          `${event.pointerPosition.y - preview.offsetHeight / 2}px)`;
      }
    });
  }

  ngOnDestroy(): void {
    this.moveSub.unsubscribe();
  }
}
