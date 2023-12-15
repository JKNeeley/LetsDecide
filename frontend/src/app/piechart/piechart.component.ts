import { Component, Input, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Questions } from '../results/results.model';

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
    Promise.resolve().then(() => {
      this.createChart(this.question, this.qnum);
    });
  }

  public chart: any;
  chart_json!: JSON;

  createChart(question: Questions, qnum: Number) {
    
    //console.log(question);
    const labels = question.count.map((option: any) => option[0].option);
    const data = question.count.map((option: any) => option[0]?.votes || 0);

    
    const canvas = document.getElementById(qnum.toString()) as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas not found');
      return;
    }
  
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }
  
    // Provide labels and data from before
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: question.description,
            data: data,
            backgroundColor: [
              'rgb(31, 119, 180)',
              'rgb(255, 127, 14)',
              'rgb(44, 160, 44)',
              'rgb(214, 39, 40)',
              'rgb(148, 103, 189)',
              'rgb(140, 86, 75)',
              'rgb(227, 119, 194)',
              'rgb(127, 127, 127)',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 1,
      },
    });
  
    //const topWinners = this.winners ? this.winners.slice(0, 3) : [];
    //console.log(`Question ${qnum} Top 3 Winners:`, topWinners);
    
  }
  
  /*
  createChart(question : Questions, qnum: Number) {
    console.log('This is the question, qnum: ',qnum, '\n', question);
    
    
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
  */
}
