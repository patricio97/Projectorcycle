import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeletePostPage } from './delete-post.page';

const routes: Routes = [
  {
    path: '',
    component: DeletePostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeletePostPageRoutingModule {}
