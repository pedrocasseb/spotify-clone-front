import { TestBed } from '@angular/core/testing';

import { SongContent } from './song-content';

describe('SongContent', () => {
  let service: SongContent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongContent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
