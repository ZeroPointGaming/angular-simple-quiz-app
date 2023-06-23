import { TemplateLiteralElement } from '@angular/compiler';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';

const questions: { question: string, answers: string[], correct_answer: number }[] = [
  {
    question: 'Which js function is used to calculate an expression?',
    answers: ['calculate()', 'evaluate()', 'calc()', 'eval()'],
    correct_answer: 3
  },
  {
    question: 'Which technologies are used to build webpages?',
    answers: ['HTML', 'CSS', 'Javascript', 'All of the above'],
    correct_answer: 3
  },
  {
    question: 'What is HTML used for?',
    answers: ['Skeleton of website', 'Design of a website', 'Database of a website', 'All of the above'],
    correct_answer: 0
  },
  {
    question: 'What is the value of a in a+=b where a = 10 and b = 5?',
    answers: ['10', '5', '15', '20'],
    correct_answer: 2
  },
  {
    question: 'Javascript statements should terminate with what symbol?',
    answers: ['Comma', 'Period', 'Questionmark', 'Semicolon'],
    correct_answer: 3
  },
  {
    question: 'Which selector selects all the elements in css?',
    answers: ['*', '+', '$', '#'],
    correct_answer: 0
  },
  {
    question: 'How do you call a function?',
    answers: ['call.function_name', 'call(function_name)', 'function_name()', 'function_name.call'],
    correct_answer: 2
  },
  {
    question: 'What makes websites dynamic?',
    answers: ['Javascript', 'CSS', 'Bootstrap', 'HTML'],
    correct_answer: 0
  },
  {
    question: 'Which CSS property changes background color?',
    answers: ['color', 'bgcolor', 'background', 'background-color'],
    correct_answer: 3
  },
  {
    question: 'What does "document" denote in a javascript statement?',
    answers: ['Javascript Document', 'HTML Document', 'CSS Document', 'XML Document'],
    correct_answer: 1
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-app';
  questions = questions;
  trackerColor = ['#8c8c8c','#8c8c8c','#8c8c8c','#8c8c8c','#8c8c8c','#8c8c8c','#8c8c8c','#8c8c8c','#8c8c8c','#8c8c8c'];
  currentQuestionIndex: number = 0;
  currentQuestion: any;
  questionCount = 0;
  progress = "Question " + (this.questionCount+1) + " of 10";
  score:number = 0;
  display = false; 
  result = '';
  defaultColor = '#e6f3ff';
  optionBg = false; 
  ans:any;

  countDown:any; 
  timer = '00:00';
  secsInput = 30;
  secs = this.secsInput; 

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }

  @ViewChild('timerEl') timerEl: any;
  ngAfterViewInit() {
    this.startTimer(this.timerEl.nativeElement);
    this.cdr.detectChanges();
  }
  
  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }

  checkAnswer(selectedIndex: number, current_question: number) {
    console.log(selectedIndex + "\n\n" + current_question);

    if (selectedIndex === this.questions[current_question].correct_answer) {
      this.score++;
      current_question += 1;
      document.getElementById("nos" + current_question)?.setAttribute("style", "background-color: #009900");
    } else {
      current_question += 1;
      document.getElementById("nos" + current_question)?.setAttribute("style", "background-color: #cc0000");
    }

    if (current_question == 10)
    {
      this.finalScore();
    }
  }

  retakeTest() {
    window.location.reload();
  }

  finalScore() {
    if(this.score > 5) {
      this.result = "Congrats! You passed! \n Your score is " + this.score + "!";
    }
    else {
      this.result = "Sorry. You failed. \n Your score is " + this.score + "!";
    }

    this.display = true; 
    this.progress = 'Quiz Completed';
    this.finalScore();
    this.timer = '00:00'
  }

  startTimer(e: any) {
    this.countDown = setTimeout(() => {
      this.timer = "00:" + this.secs;
      this.secs--;
      if(this.secs<0) {
        clearTimeout(this.countDown);
        console.log("counddown" + this.countDown);
        this.secs =  this.secsInput; 
        this.nextQuestion();
        return;
      }
      this.startTimer(this.timerEl.nativeElement);
    },1000);
  }
}
