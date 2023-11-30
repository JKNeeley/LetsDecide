import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

/*
@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})

//  rest of the code
export class PiechartComponent implements OnInit {
  constructor() { }
 ngOnInit(): void {
    this.createChart();
  }
  public chart: any;

  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart
      // type: 'doughnut',

      data: {// values on X-Axis
        labels: [],
	       datasets: [
          { label: "", data: [''],},
          { label: "", data: [''],}]
      },
      options: { aspectRatio:2.5}
    });}}

*/

/////////

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent {
  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  public chart: any;

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
        labels: [
          'Wheat',
          'Maize',
          'Rice',
          'Sugarcane',
          'Cotton'
        ],
        datasets: [{
          label: 'Area and Production of Important Crops (2020-21)',
          data: [9168.2, 1417.8, 3335.1, 1165.0, 2078.9],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'Area and Production of Important Crops (2020-21)',
            font: {
              size: 24,
              weight: 'bold',
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
            },
            padding: {
              top: 10,
              bottom: 30
            }
          },
          legend: {
            display: true,
            labels: {
              font: {
                size: 14,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
              }
            }
          }
        }
      }
    });
  }
}
