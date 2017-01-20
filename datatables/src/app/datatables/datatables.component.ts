import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datatables',
  templateUrl: './datatables.component.html',
  styleUrls: ['./datatables.component.css']
})
export class DatatablesComponent implements OnInit {

  public data =
    [{
      "name": "Anna",
      "lastName": "Konda"
    },
    {
      "name": "Wayne",
      "lastName": "Interessierts"
    }];

  public tableWidget: any;

  public selectedName: string=""


  constructor() { }

  ngOnInit() {
    let that=this;
    $(document).ready(function() {
      let exampleId: any = $('#example');
      that.tableWidget = exampleId.DataTable({
        select: true
      } );
      $('#example')
        .removeClass( 'display' )
        .addClass('table table-striped table-bordered');

    } );
  }

  public deleteRow(): void {
    this.data.pop();
  }

  public addRow(): void {
    if (this.data.length%5==0) {
      this.data.push({"name": "Anna", "lastName": "Konda"})
    } else if (this.data.length%5==1) {
      this.data.push({"name": "Wayne", "lastName": "Interessierts"})
    } else if (this.data.length%5==2) {
      this.data.push({"name": "Andy", "lastName": "Biotika"})
    } else if (this.data.length%5==3) {
      this.data.push({"name": "Niko", "lastName": "Tin"})
    } else {
      this.data.push({"name": "Mo", "lastName": "Zarella"})
    }
  }

  public selectRow(index: number, row:any) {
    this.selectedName = "row#" + index + " " + row.name
  }
}
