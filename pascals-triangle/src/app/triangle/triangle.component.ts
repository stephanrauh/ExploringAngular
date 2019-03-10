import { Component, OnInit } from '@angular/core';
import { TriangleService } from '../state/triangle.service';

@Component({
  selector: 'app-triangle',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.css']
})
export class TriangleComponent implements OnInit {
  constructor(public triangleService: TriangleService) {}

  ngOnInit() {}
}
