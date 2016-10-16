import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'timetable',
  templateUrl: './timetable.html',
  styleUrls: ['./timetable.css']
})
export class TimetableComponent implements OnInit {

  private isTableInitialized = false;

  ngOnInit(): void {
    var dataSet = [
      [ "2016/10/01", "07:15", "09:00", "0",  "BootsFaces / Showcase", "" ],
      [ "2016/10/01", "09:15", "10:00", "0",  "BootsFaces / Travel", "58 km by car" ],
      [ "2016/10/01", "10:00", "17:00", "45", "BootsFaces / new Components", "" ],
      [ "2016/10/01", "17:00", "17:45", "0",  "BootsFaces / Travel", "58 km by car" ],
      [ "2016/10/01", "17:45", "18:45", "0",  "AngularFaces / user support", "" ],
      [ "2016/11/01", "07:15", "09:00", "0",  "BootsFaces / Showcase", "" ],
      [ "2016/11/01", "09:15", "10:00", "0",  "BootsFaces / Travel", "58 km by car" ],
      [ "2016/11/01", "10:00", "17:00", "45", "BootsFaces / new Components", "" ],
      [ "2016/11/01", "17:00", "17:45", "0",  "BootsFaces / Travel", "58 km by car" ],
      [ "2016/11/01", "17:45", "18:45", "0",  "AngularFaces / user support", "" ],
      [ "2016/12/01", "07:15", "09:00", "0",  "BootsFaces / Showcase", "" ],
      [ "2016/12/01", "09:15", "10:00", "0",  "BootsFaces / Travel", "58 km by car" ],
      [ "2016/12/01", "10:00", "17:00", "45", "BootsFaces / new Components", "" ],
      [ "2016/12/01", "17:00", "17:45", "0",  "BootsFaces / Travel", "58 km by car" ],
      [ "2016/12/01", "17:45", "18:45", "0",  "AngularFaces / user support", "" ],
      [ "2016/01/02", "07:15", "09:00", "0",  "BootsFaces / Showcase", "" ],
      [ "2016/01/02", "09:15", "10:00", "0",  "BootsFaces / Travel", "58 km by car" ],
      [ "2016/01/02", "10:00", "17:00", "45", "BootsFaces / new Components", "" ],
      [ "2016/01/02", "17:00", "17:45", "0",  "BootsFaces / Travel", "58 km by car" ],
      [ "2016/01/02", "17:45", "18:45", "0",  "AngularFaces / user support", "" ],

    ];

    $(document).ready(function() {
      if (!this.isTableInitialized) {
        this.isTableInitialized = true;
        $('#example').DataTable({
          data: dataSet,
          columns: [
            {title: "Date", type: "date"},
            {title: "From", type: "time"},
            {title: "To"},
            {title: "Break"},
            {title: "Project"},
            {title: "Expenses"},
          ]
        });
      }
    } );
  }


}
