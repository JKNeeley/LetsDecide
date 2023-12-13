export interface Form {
    _id: string,
    Title: string,
    Description: number,
    Type: number,
    State: number
    Time_Close: Date,
    Questions_ID: string,
    Responses_ID: string
  }
  
  export interface Questions {
    Questions: Array<Question>
  }
  
  interface Question {
    Parent_Form_ID: string,
    Type: number,
    Description: string,
    Show_Top: number,
    Options: Array<string>
  }
  