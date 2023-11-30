export interface Results{
  title: string,
  description: string,
  [question: number]:{
    description: string,
    winners: Array<String>,
    [count: number]:{
      option: string,
      votes: number
    }
  }
}
