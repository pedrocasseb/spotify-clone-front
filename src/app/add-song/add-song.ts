import { Component, effect, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthorVO, SaveSong, TitleVO } from '../service/model/song.model';
import { Song } from '../service/song';
import { Router } from '@angular/router';
import { Toast } from '../service/toast';
import { CreateSongFormContent } from './add-song-form.model';
import { ChangeDetectorRef } from '@angular/core';

type FlowStatus = 'init' | 'validation-file-error' | 'validation-cover-error' | 'success' | 'error';

@Component({
  selector: 'app-add-song',
  imports: [ReactiveFormsModule, NgbAlertModule, FontAwesomeModule],
  templateUrl: './add-song.html',
  styleUrl: './add-song.scss'
})
export class AddSong implements OnDestroy{

  public songToCreate: SaveSong = {};

  private formBuilder = inject(FormBuilder);

  private songService = inject(Song);

  private router = inject(Router);

  private toastService = inject(Toast);

  isCreating = false;

  flowStatus: FlowStatus = "init";

  public createForm = this.formBuilder.nonNullable.group<CreateSongFormContent>({
    title: new FormControl('' ,{nonNullable: true, validators:[Validators.required]}),
    author: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    cover: new FormControl(null, {nonNullable: true, validators: [Validators.required]}),
    file: new FormControl(null, {nonNullable: true, validators: [Validators.required]}),
  });

  private cdr = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      this.isCreating = false;
      if (this.songService.addSig().status === "OK") {
        this.toastService.show('Song created with success', "SUCCESS");
        this.router.navigate(['/']);
      } else if (this.songService.addSig().status === "ERROR") {
        this.toastService.show('Error occured when creating song, please try again', "DANGER");
      }
      this.cdr.detectChanges(); // <-- Força atualização
    });
  }

  ngOnDestroy(): void {
    this.songService.reset();
  }

  create(): void {
    this.isCreating = true;

    if(this.songToCreate.file === null) {
      this.flowStatus = 'validation-file-error';
    }

    if(this.songToCreate.cover === null) {
      this.flowStatus = 'validation-cover-error';
    }

    const titleVO: TitleVO = {value: this.createForm.value.title};
    const authorVO: AuthorVO = {value: this.createForm.value.author};


    this.songToCreate.title = titleVO;
    this.songToCreate.author = authorVO;

    this.songService.add(this.songToCreate);
  }

  private extractFileFromTarget(target: EventTarget | null): File | null {
    const htmlInputTarget = target as HTMLInputElement;
    if(target === null || htmlInputTarget.files === null) {
      return null;
    }
    return htmlInputTarget.files[0];
  }

  onUploadCover(target: EventTarget | null) {
    const cover = this.extractFileFromTarget(target);
    if(cover !== null) {
      this.songToCreate.cover = cover;
      this.songToCreate.coverContentType = cover.type;
    }
  }

  onUploadFile(target: EventTarget | null) {
    const file = this.extractFileFromTarget(target);
    if(file !== null) {
      this.songToCreate.file = file;
      this.songToCreate.fileContentType = file.type;
    }
  }

}
