//Unit test

let ob = {
  "_id": {
    "$oid": "653bef9c59b67ba9f89d92ac"
  },
  "Responses": [
    {
      "Parent_Form_ID": "653beeb559b67ba9f89d92a1",
      "Answers": [
        [
          "TGI Fridays"
        ],
        [
          "12:30"
        ]
      ]
    },
    {
      "Parent_Form_ID": "653beeb559b67ba9f89d92a1",
      "Answers": [
        [
          "Olive Garden"
        ],
        [
          "1:00"
        ]
      ]
    },
    {
      "Parent_Form_ID": "653beeb559b67ba9f89d92a1",
      "Answers": [
        [
          "Olive Garden"
        ],
        [
          "12:30"
        ]
      ]
    }
  ]
}


let ans = []

ob.Responses.forEach(to_arr)

function to_arr(x)
{
    //console.log(x)
    delete x.Parent_Form_ID
    ans.push(x.Answers)
}


console.log(ans)

count = []
for (let i = 0; i < ans[0].length; i++){
    console.log('i')
    count.push([])
    for (let j = 0; j < ans.length; j++){
        console.log('j')
        if (ans[j][i].length > 1){
            break
        }
        let vote = ans[j][i][0]
        let voteFound = false
        for (let k = 0; k < count[i].length; k++){
            if (count[i][k][0] == vote){
                voteFound = true
                count[i][k][1] += 1
                break
            }
        }
        if (!voteFound){
            count[i].push([vote,1])
            console.log('no')
        }
    }
}

console.log(count)
