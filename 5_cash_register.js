function checkCashRegister(price, cash, cid) {
  const change = (cash - price);
  console.log("PRICE:"+price,"CASH:"+cash,"CHANGE:"+change);
  if(change < 0) return "INSUFFICIENT PAYMENT: CASH AMOUNT BELOW THE PRICE";
  if (change == 0) return "NO CHANGE NEEDED";

  //TOTAL DO DINHEIRO EM CAIXA
  let totalCashInDrawer = getCashInDrawerTotal(cid);
  console.log("CASH-IN-DRAWER:"+totalCashInDrawer.toFixed(2));
  if (totalCashInDrawer < change) return { status: "INSUFFICIENT_FUNDS", change: [] };

  //ARRAY COMPLETA COM DINHEIRO DISPONÍVEL (APÓS DESCONTAR OS TROCOS POSSÍVEIS)
  const cashAvailableAfterChangeArray = getCIDavailableAfterChange(cid, change);
  //TOTAL DO DINHEIRO EM CAIXA (APÓS DESCONTAR OS TROCOS POSSÍVEIS)
  const totalCashAfterChange = twoDec(getCashInDrawerTotal(cashAvailableAfterChangeArray));
  //TOTAL DO TROCO REMANESCENTE (APÓS DESCONTAR OS TROCOS POSSÍVEIS)
  const changeRemaining = twoDec(getChangeRemainingTotalAfterChange(cid, change));


  //SE FALTA DAR TROCO (TROCOS POSSÍVEIS INSUFICIENTES) & SOBRA DINHEIRO EM CAIXA
  if (changeRemaining > 0 && totalCashAfterChange > 0)
    return { status: "INSUFFICIENT_FUNDS", change: [] };

  //SE TROCO CERTO & CAIXA VAZIA (ordem ascendente)
  if (changeRemaining == 0 && totalCashAfterChange == 0) {
    const usedChangeArray = getCIDusedChangeOnly(cid, change);
    const closeCID_Arr = emergeCIDwithCIDchanges(cashAvailableAfterChangeArray, usedChangeArray);
    return { status: "CLOSED", change: closeCID_Arr };
  }
  //SE TROCO CERTO & SOBRA DINHEIRO EM CAIXA (ordem descendente!)
  if (changeRemaining == 0 && totalCashAfterChange > 0) {
    const openCID_Arr = getCIDusedChangeOnly(cid, change).reverse();
    return { status: "OPEN", change: openCID_Arr };
  }
  return "UNDEFINED";
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));

//console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

//console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

//console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

//console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));

//console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));

//console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));



//FUNÇÕES AUXILIARES


//RETORNA NÚMERO COM 2 CASAS DECIMAIS
function twoDec (num) { return parseFloat(num.toFixed(2)); }
//ANALISA QUAL A UNIDADE DE MOEDA E RETORNA O CORRESPONDENTE VALOR PARA SUBTRAÇÃO 
function getSubtractorFromCashUnit(cashUnit) {
  let subtractor = 0;
  switch(cashUnit) {
    case "ONE HUNDRED":
      subtractor = 100;
      break;
    case "TWENTY":
      subtractor = 20;
      break;
    case "TEN":
      subtractor = 10;
      break;
    case "FIVE":
      subtractor = 5;
      break;
    case "ONE":
      subtractor = 1;
      break;
    case "QUARTER":
      subtractor = 0.25;
      break;
    case "DIME":
      subtractor = 0.10;
      break;
    case "NICKEL":
      subtractor = 0.05;
      break;
    case "PENNY":
      subtractor = 0.01;
      break;
    default:
      subtractor = 0;
      break;
  }
  return twoDec(subtractor);
}
//RETORNA A SOMA TOTAL DO DINHEIRO QUE HÁ EM CAIXA
function getCashInDrawerTotal(cid) {
  let total = 0;
  for (let moneyUnit of cid) {
    total += moneyUnit[1];
  }
  return twoDec(total);//Math.round(total * 100) / 100;
}
//RETORNA A SOMA TOTAL DO TROCO REMANESCENTE (APÓS VERIFICAR TODOS OS TROCOS POSSÍVEIS)
function getChangeRemainingTotalAfterChange(cid, originalChange) {
  let changeRemaining = originalChange;

  //PERCORRE ARRAY A COMEÇAR DO ÚLTIMO ITEM (NOTA ($) MAIS ALTA)
  for(let i = (cid.length - 1); i >= 0; i--) {
    let cashUnit = cid[i][0], cashAvailable = cid[i][1];
    let subtractor = getSubtractorFromCashUnit(cashUnit);
    console.log("AVAILABLE:"+cashUnit+"("+subtractor+") $"+cashAvailable.toFixed(2), ", CHANGE:$"+changeRemaining.toFixed(2));

    //ENQUANTO AMBAS A MOEDA/NOTA E O TROCO RESTANTE FOREM SUBTRAÍVEIS...
    while ((cashAvailable - subtractor) >= 0 && (changeRemaining - subtractor) >= 0) {
      changeRemaining = twoDec(changeRemaining - subtractor);
      cashAvailable = twoDec(cashAvailable - subtractor);
      console.log("AVAILABLE:"+cashUnit+" $"+cashAvailable, ", SUBTRACTOR:$-"+subtractor, "CHANGE:$"+changeRemaining);
    }
  }
  return changeRemaining;
}

//RETORNA CAIXA DISPONÍVEL APÓS TODOS OS TROCOS POSSÍVEIS
function getCIDavailableAfterChange(cid, originalChange) {
  let changeRemaining = originalChange;
  //VERIFICA SE HÁ TROCO
  let newArr = [];

  //PERCORRE ARRAY A COMEÇAR DO ÚLTIMO ITEM (NOTA ($) MAIS ALTA)
  for(let i = (cid.length - 1); i >= 0; i--) {
    let cashUnit = cid[i][0], cashAvailable = cid[i][1];
    let subtractor = getSubtractorFromCashUnit(cashUnit);
    console.log("AVAILABLE:"+cashUnit+"("+subtractor+") $"+cashAvailable.toFixed(2), ", CHANGE:$"+changeRemaining.toFixed(2));

    //ENQUANTO AMBAS A MOEDA/NOTA E O TROCO RESTANTE FOREM SUBTRAÍVEIS...
    while ((cashAvailable - subtractor) >= 0 && (changeRemaining - subtractor) >= 0) {
      changeRemaining = twoDec(changeRemaining - subtractor);
      cashAvailable = twoDec(cashAvailable - subtractor);
      console.log("AVAILABLE:"+cashUnit+" $"+cashAvailable, ", SUBTRACTOR:$-"+subtractor, "CHANGE:$"+changeRemaining);
    }

    //ARRAY DINHEIRO DISPONÍVEL (CADA MOEDA/NOTA) - ORDEM ASCENDENTE
    newArr.unshift([cashUnit, cashAvailable]);
    //console.log(cashAvailableAfterChangeArray);
  }
  return newArr;
}

//RETORNA CAIXA SÓ COM OS TROCOS USADOS (TROCOS POSSÍVEIS)
function getCIDusedChangeOnly (cid, originalChange) {
  let changeRemaining = originalChange;
  let newArr = [];

  //PERCORRE ARRAY A COMEÇAR DO ÚLTIMO ITEM (NOTA ($) MAIS ALTA)
  for(let i = (cid.length - 1); i >= 0; i--) {
    let cashUnit = cid[i][0], cashAvailable = cid[i][1];
    let totalSubtraction = 0;
    let subtractor = getSubtractorFromCashUnit(cashUnit);
    console.log("AVAILABLE:"+cashUnit+"("+subtractor+") $"+cashAvailable.toFixed(2), ", CHANGE:$"+changeRemaining.toFixed(2));

    //ENQUANTO AMBAS A MOEDA/NOTA E O TROCO RESTANTE FOREM SUBTRAÍVEIS...
    while ((cashAvailable - subtractor) >= 0 && (changeRemaining - subtractor) >= 0) {
      changeRemaining = twoDec(changeRemaining - subtractor);
      cashAvailable = twoDec(cashAvailable - subtractor);
      totalSubtraction = parseFloat(((totalSubtraction + subtractor).toFixed(2)));
      console.log("AVAILABLE:"+cashUnit+" $"+cashAvailable, ", SUBTRACTOR:$-"+subtractor, "CHANGE:$"+changeRemaining, "SUBTRACTION:$"+totalSubtraction);
    }
    //ARRAY APENAS COM OS TROCOS USADOS
    if(totalSubtraction > 0) {
      newArr.unshift([cashUnit, totalSubtraction]);
      console.log(newArr);
    }
  }
  return newArr;
}
//QUANDO HÁ TROCO CERTO E A CAIXA FICA VAZIA (fecho de caixa)
//RETORNA CAIXA COM TROCOS USADOS + VALORES INALTERADOS (A $0.00)
function emergeCIDwithCIDchanges (cid1, cid2_onlyChanges) {
  let newArr = [];
  for (let money2 of cid2_onlyChanges.reverse()) { //LOOP1 CHANGES
    for (let money1 of cid1){    //LOOP UPDATED-AFTER-CHANGE CASH-IN-DRAW
      if(money1[0] == money2[0])  //If updated == changed (SE ENCONTROU!)
        newArr.push([money2[0], twoDec(money2[1])]); //+changed (+ALTERAÇÃO)
      else 
        newArr.push([money1[0], twoDec(money1[1])]); //+updated (+MESMO)
    }
  }
  return newArr;
}
