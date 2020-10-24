import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/** NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './state/posts.effects';
import { postsFeatureKey, postsReducer } from './state/posts.reducer';

import { PostsService } from './posts.service';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostItemComponent } from './post-item/post-item.component';
import { SharedModule } from '../shared/shared.module';

const routes = [{
  path: '',
  component: PostsPageComponent,
},
{ path: ':userId',
  component: PostsPageComponent
}];

@NgModule({
  declarations: [PostsPageComponent, PostsListComponent, PostItemComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(postsFeatureKey, postsReducer),
    EffectsModule.forFeature([PostsEffects])
  ],
  providers: [PostsService]
})
export class PostsModule { }
