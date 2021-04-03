import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
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

  //option 2
  public form: FormGroup;
  unsubcribe: any;

  public fields: any[] = [
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      value: "",
      required: true,
    },
    {
      type: "text",
      name: "lastName",
      label: "Last Name",
      value: "",
      required: true,
    },
    {
      type: "text",
      name: "email",
      label: "Email",
      value: "",
      required: true,
    },

    {
      type: "file",
      name: "picture",
      label: "Picture",
      required: true,
      onUpload: this.onUpload.bind(this),
    },
    {
      type: "dropdown",
      name: "country",
      label: "Country",
      value: "in",
      required: true,
      options: [
        { key: "in", label: "India" },
        { key: "us", label: "USA" },
      ],
    },
    {
      type: "radio",
      name: "country",
      label: "Country",
      value: "in",
      required: true,
      options: [
        { key: "m", label: "Male" },
        { key: "f", label: "Female" },
      ],
    },
    {
      type: "checkbox",
      name: "hobby",
      label: "Hobby",
      required: true,
      options: [
        { key: "f", label: "Fishing" },
        { key: "c", label: "Cooking" },
      ],
    },
  ];
  //end option 2

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();

    //option2
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields)),
    });
    this.unsubcribe = this.form.valueChanges.subscribe((update) => {
      console.log(update);
      this.fields = JSON.parse(update.fields);
    });
  }

  ngOnInit(): void {}

  onUpload(e) {
    console.log(e);
  }

  getFields() {
    return this.fields;
  }

  ngDistroy() {
    this.unsubcribe();
  }
}
