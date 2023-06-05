import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeletePostPageRoutingModule } from './delete-post-routing.module';

import { DeletePostPage } from './delete-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeletePostPageRoutingModule
  ],
  declarations: [DeletePostPage]
})
export class DeletePostPageModule {}
