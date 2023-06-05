import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeletePostPage } from './delete-post.page';

describe('DeletePostPage', () => {
  let component: DeletePostPage;
  let fixture: ComponentFixture<DeletePostPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeletePostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
