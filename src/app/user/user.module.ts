import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/** NgRx */
import { StoreModule } from '@ngrx/store';
import { userFeatureKey, userReducer } from './state/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';
import { UserPageComponent } from './user-page/user-page.component';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes = [
  {
    path: '',
    component: UserPageComponent
  }
]

@NgModule({
  declarations: [UserPageComponent, UserListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    // RouterModule.forChild(routes),
    StoreModule.forFeature(userFeatureKey, userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  exports: [UserPageComponent]
})
export class UserModule { }
