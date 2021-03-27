import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { QuestionService } from "../dynamic-form-question/question.service";
import { QuestionBase } from "../share/question-base";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
  providers: [QuestionService],
})
export class UserComponent implements OnInit {
  questions$: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
  }

  ngOnInit(): void {}
}
