import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// also import the "angular2-esri-loader" to be able to load JSAPI modules
import { EsriLoaderService } from 'angular2-esri-loader';

@Component({
    selector: 'esri',
    template: `
    <h1>
      Esri JSAPI with
      <a href="https://github.com/tomwayson/angular2-esri-loader" target="_blank">
        <code>angular2-esri-loader</code>
      </a>
    </h1>
    <div #mapViewNode></div>
  `,
    styleUrls: ['./esri.component.css']
})
export class EsriMapComponent implements OnInit {
    // for JSAPI 4.x you can use the "__esri" namespace for TS types
    public mapView: __esri.MapView;

    // this is needed to be able to create the MapView at the DOM element in this component
    @ViewChild('mapViewNode') private mapViewEl: ElementRef;

    constructor(
        public route: ActivatedRoute,
        private esriLoader: EsriLoaderService
    ) { }


    public ngOnInit() {
        // only load the ArcGIS API for JavaScript when this component is loaded
        return this.esriLoader.load({
            // use a specific version of the JSAPI
            url: 'https://js.arcgis.com/4.3/'
        }).then(() => {
            // load the needed Map and MapView modules from the JSAPI
            this.esriLoader.loadModules([
                'esri/Map',
                'esri/views/MapView'
            ]).then(([
                Map,
                MapView
            ]) => {
                /*
                const basemap1: __esri.BasemapProperties = { title: 'hybrid' };
                const mapProperties: __esri.MapProperties = {
                    basemap: basemap1
                };

                const map: __esri.Map = new Map(mapProperties);
                
                const center1: __esri.PointProperties = { longitude: 45.0, latitude: 40.5 };
                const mapViewProperties: __esri.MapViewProperties = {
                    // create the map view at the DOM element in this component
                    container: this.mapViewEl.nativeElement,
                    // supply additional options
                    center: center1,
                    zoom: 12,
                    map: map // property shorthand for object literal
                };
                */

                const mapProperties = {
                    basemap: "hybrid"
                };

                const map = new Map(mapProperties);

                const mapViewProperties = {
                    // create the map view at the DOM element in this component
                    container: this.mapViewEl.nativeElement,
                    // supply additional options
                    center: [12, 10],
                    zoom: 12,
                    map // property shorthand for object literal
                };

                this.mapView = new MapView(mapViewProperties);
            });
        });
    }
}