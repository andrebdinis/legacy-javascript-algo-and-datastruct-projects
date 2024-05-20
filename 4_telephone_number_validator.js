function telephoneCheck(str) {
  //regex sem aspas
  let regexSemAspas = /^[1]*[\s]*[\d]{3}[\s]*[-]*[\d]{3}[\s]*[-]*[\d]{4}$/g;
  //regex com aspas obrigatórias
  let regexComAspas = /^[1]*[\s]*[(][\d]{3}[)][\s]*[-]*[\d]{3}[\s]*[-]*[\d]{4}$/g;
  let numberArr1 = str.match(regexSemAspas);
  let numberArr2 = str.match(regexComAspas);

  //verifica se alguma array é válida
  if(numberArr1 == null) {
    if (numberArr2 == null)
      return false;
    numberArr1 = [].concat(numberArr2); //se a 2.ª array for válida, concatena o seu valor para a 1.ª array (que é usada no resto do programa)
  }

  let numberArrSimplex = numberArr1.join("").match(/\d/g);
  if (numberArrSimplex.length == 11) {
    if(numberArrSimplex[0] == 1) //Se countryCode é igual a 1
      return true;
    else
      return false;
  }

  if(numberArrSimplex.length == 10)
    return true;

  return false;
}

console.log(telephoneCheck("1 555)555-5555"));