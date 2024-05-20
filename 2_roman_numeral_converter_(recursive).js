function convertToRoman(num) {
  const n = num;
  const str = n.toString();
  let roman = "";
  
  if (num < 0 || num > 3999)
    return "NEGATIVE NUMBERS DON'T EXIST NOR DEFINED ABOVE 3999";
  
  if (str.length === 1) { //UNIDADE
    switch(n) {
      case 1:
        roman = "I";
        break;
      case 2:
        roman = "II";
        break;
      case 3:
        roman = "III";
        break;
      case 4:
        roman = "IV";
        break;
      case 5:
        roman = "V";
        break;
      case 6:
        roman = "VI";
        break;
      case 7:
        roman = "VII";
        break;
      case 8:
        roman = "VIII";
        break;
      case 9:
        roman = "IX";
        break;
    }
    return roman;
  }

  if (str.length === 2) { //DEZENA
    switch(Math.floor(n / 10)) {
      case 1:
        roman = "X";
        break;
      case 2:
        roman = "XX";
        break;
      case 3:
        roman = "XXX";
        break;
      case 4:
        roman = "XL";
        break;
      case 5:
        roman = "L";
        break;
      case 6:
        roman = "LX";
        break;
      case 7:
        roman = "LXX";
        break;
      case 8:
        roman = "LXXX";
        break;
      case 9:
        roman = "XC";
        break;
    }
    return roman + "" + convertToRoman(n % 10);
  }
  
  if (str.length === 3) { //CENTENA
    switch(Math.floor(n / 100)) {
      case 1:
        roman = "C";
        break;
      case 2:
        roman = "CC";
        break;
      case 3:
        roman = "CCC";
        break;
      case 4:
        roman = "CD";
        break;
      case 5:
        roman = "D";
        break;
      case 6:
        roman = "DC";
        break;
      case 7:
        roman = "DCC";
        break;
      case 8:
        roman = "DCCC";
        break;
      case 9:
        roman = "CM";
        break;
    }
    return roman + convertToRoman(n % 100);
  }
  
  if (str.length === 4) { //MILHAR
    switch(Math.floor(n / 1000)) {
      case 1:
        roman = "M";
        break;
      case 2:
        roman = "MM";
        break;
      case 3:
        roman = "MMM";
        break;
      default:
        roman = "NOT DEFINED ABOVE 3999";
    }
    return roman + convertToRoman(n % 1000);
  }
}

console.log(convertToRoman(1));

/*
I = 1, II, III, IV
V = 5, VI, VII, VIII, IX
X = 10, XX, XXX, XL
L = 50, LX, LXX, LXXX, XC
C = 100, CC, CCC, CD
D = 500, DC, DCC, DCCC, CM
M = 1000, MM, MMM -> MMMCMXCIX (3999)
*/