export interface Results{
  title: string,
  description: string,
  questions: Array<Questions>
}

export interface Questions{
  description: string,
  winners: Array<Array<string>>,
  count: Array<Array<counts>>
}

interface counts{
  option: string,
  votes: number
}
