const alphabet = [ 'A', 'B',  'C',  'D',  'E',  'F',  'G',  'H',  'I',  'J',  'K',  'L',  'M',  'N',  'O',  'P',  'Q',  'R',  'S',  'T',  'U',  'V',  'W',  'X',  'Y',  'Z' ] //26 letras

function rot13(str) {
  let arr = "".concat(str).match(/\w+\S/gi); //regex filtra palavras e caracteres especiais
  let decoded = arr
  .reduce((acc, word) => { //
    let decodedWord = "";
    for (let letter of word) {
      let isLetter = alphabet.indexOf(letter) >= 0 ? true : false;

      if(isLetter) { //Se for uma letra
        let pos = alphabet.indexOf(letter) + 13;
        if(pos > 25) //se a posição ultrapassar o limite máx. index do alfabeto
          pos -= 26;
        let decodedLetter = alphabet[pos];
        decodedWord += decodedLetter;
      }
      else
        decodedWord += letter; //Se não for uma letra (um caractere especial)
    }
    return acc.concat(decodedWord);
  }, [])
  .join(" "); //CONVERTE A ARRAY REDUZIDA em texto, unida entre espaços

  return decoded;
}

rot13("SERR PBQR PNZC");
rot13("SERR CVMMN!");

//GENERATE ALPHABET (ASCII CODE FROM 65 UNTIL 90)
/*
let arr = [];
for (let i = 65; i <= 90; i++) {
  arr.push(String.fromCharCode(i));
  //"ABC".charCodeAt(0); //65 -> equivale ao "A" em ASCII
}
console.log(arr)
*/
