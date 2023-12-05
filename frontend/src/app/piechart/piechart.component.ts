import { Component, Input, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Questions } from '../results/results.model';

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

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements AfterViewInit {
  @Input() question!: Questions;
  @Input() qnum!: Number;

  constructor() { }

  ngAfterViewInit(): void {
    console.log(this.question.winners);
    this.createChart(this.question, this.qnum);
  }

  public chart: any;
  chart_json!: JSON;

  createChart(question : Questions, qnum: Number) {
    console.log(qnum.toString());
    var canvas = <HTMLCanvasElement> document.getElementById(qnum.toString());
    const ctx = canvas.getContext('2d');
    if (ctx == null) return;
    else console.log(ctx);
    this.chart = new Chart(ctx, {
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
          label: question.description,
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
            text: question.description,
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
