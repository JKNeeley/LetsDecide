export interface Results{
  title: string,
  description: string,
  question: Array<questions>
}

interface questions{
  description: string,
  winners: Array<Array<string>>,
  count: Array<Array<counts>>
}

interface counts{
  option: string,
  votes: number
}
