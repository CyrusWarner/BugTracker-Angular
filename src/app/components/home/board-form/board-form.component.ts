import { NewBoard } from './../../../shared/models/board-models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css']
})
export class BoardFormComponent implements OnInit {
boardForm!: FormGroup
title?: FormControl
description?: FormControl

  constructor() { }

  ngOnInit(): void {
    this.buildBoardForm()
  }

  buildBoardForm(){
    this.title = new FormControl('', Validators.required)
    this.description = new FormControl('', Validators.required)

    this.boardForm = new FormGroup({
      title: this.title,
      description: this.description
    })
  }

  addNewBoard(newBoard: NewBoard) {

  }

  canSubmitBoardForm(boardForm: FormGroup){
    return boardForm.invalid

  }

}
