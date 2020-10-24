import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'ab-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostItemComponent {

  @Input() post: Post;

}
