import { TestBed } from '@angular/core/testing';

import { Song } from './song';

describe('Song', () => {
  let service: Song;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Song);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
