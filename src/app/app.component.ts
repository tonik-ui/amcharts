import { Component, NgZone, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'amcharts';

  private chart: am4charts.XYChart;

  constructor(private zone: NgZone) { }

  ngOnInit() {
    this.lineGroup();
  }

  lineGroup(){
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create('chartdiv', am4charts.XYChart);  
      chart.paddingRight = 20;

      chart.scrollbarX = new am4core.Scrollbar();
      let data = [];
      let value = 50;
      for(let i = 0; i < 1000000; i++){
        let date = new Date();
        date.setHours(0,0,0,0);
        date.setDate(i);
        value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        data.push({date:date, value: value});
      }

      chart.data = data;
 
      
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.minZoomCount = 5;

      // this makes the data to be grouped
      dateAxis.groupData = true;
      dateAxis.groupCount = 500;
      
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value";
      series.dataFields.dateX = "date";
      series.tooltipText = "{value}"
      series.tooltip.pointerOrientation = "vertical";
 
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;
      
      let scrollbarX = new am4core.Scrollbar();
      scrollbarX.marginBottom = 20;
      chart.scrollbarX = scrollbarX;    

      this.chart = chart;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
    }
}
