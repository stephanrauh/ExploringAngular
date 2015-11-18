import {bootstrap, Component} from 'angular2/angular2';
import {Component, View, FORM_DIRECTIVES} from 'angular2/angular2';

@Component({
    selector: 'my-app',
})
@View({
    directives: [FORM_DIRECTIVES],
    templateUrl: 'app.html'
})

class AppComponent {
	public eingabe: string = `4 4
*...
....
.*..
....`;
	public ausgabe: string;
	
	public zaehle() {
		this.eingabeValidieren();
	    var zeilen: Array<string> = this.eingabe.split("\n");
		var result = ""
		for (var y=1; y < zeilen.length; y++) {
			for (var x = 0; x < zeilen[y].length; x++) {
				var anzahl = 0;
				
				if (this.pruefeFeldIstBombe(x, y, zeilen))
					result += "*"
				else {
					if (this.pruefeFeldIstBombe(x-1, y-1, zeilen))
						anzahl++;
					if (this.pruefeFeldIstBombe(x, y-1, zeilen))
						anzahl++;
					if (this.pruefeFeldIstBombe(x+1, y-1, zeilen))
						anzahl++;

					if (this.pruefeFeldIstBombe(x-1, y, zeilen))
						anzahl++;
					if (this.pruefeFeldIstBombe(x+1, y, zeilen))
						anzahl++;

					if (this.pruefeFeldIstBombe(x-1, y+1, zeilen))
						anzahl++;
					if (this.pruefeFeldIstBombe(x, y+1, zeilen))
						anzahl++;
					if (this.pruefeFeldIstBombe(x+1, y+1, zeilen))
						anzahl++;
					
					result += anzahl
				}
			}
			result += "\n"
		}
		this.ausgabe = result
		console.log(this.ausgabe)
	}

	/**
	  Hier wird die Eingabe validiert. Falls die Eingabe nicht ok ist, wird eine Fehlermeldung
	  angezeigt.
	  */
	private eingabeValidieren() {
	}
	
	/**
	  Liefert zurück, wie das Feld an Position (x,y) aussieht
	*/
	private pruefeFeldIstBombe(x:number, y:number, zeilen: Array<string>): booolean {
		if (x < 0) return false
		if (y < 0) return false
		if (y >= zeilen.length) 
			return false
		var z = zeilen[y];
		if (x >= z.length)
			return false
		var feld = z.substring(x, x+1);
		return ("*" == feld)
	}
}
bootstrap(AppComponent);