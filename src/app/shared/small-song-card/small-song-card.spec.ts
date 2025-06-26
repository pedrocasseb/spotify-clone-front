import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallSongCard } from './small-song-card';

describe('SmallSongCard', () => {
  let component: SmallSongCard;
  let fixture: ComponentFixture<SmallSongCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallSongCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallSongCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
