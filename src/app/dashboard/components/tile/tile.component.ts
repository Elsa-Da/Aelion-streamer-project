import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  @Input() tileInfo: any;

  constructor( private _router: Router) {
  }

  ngOnInit(): void {
  }

  public onClick(object: any): void {
    this._router.navigate(object.action);
  }

}
