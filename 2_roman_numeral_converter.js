function convertToRoman(num) {
  if (num < 0)
    return "NEGATIVE NUMBERS DON'T EXIST IN ROMAN NUMERAL";
  if (num === 0)
    return "ZERO DOESN'T EXIST IN ROMAN NUMERAL";
  if (num > 3999)
    return "UNDEFINED ABOVE 3999";

  if (num < 10)
    return toUnits(num);
  if (num < 100)
    return toDozens(num) + toUnits(num);
  if (num < 1000)
    return toHundreds(num) + toDozens(num) + toUnits(num);
  if (num <= 3999)
    return toThousands(num) + toHundreds(num) + toDozens(num) + toUnits(num);
  
  return "UNDEFINED";
}

console.log(convertToRoman(-1));


//ROMAN CONVERSIONS to Units, Dozens, Hundreds and Thousands (until 3999)
function toUnits(num) {
  let roman = "";
  let units = getDigitFromNumber(num, 1);
  switch(units) {
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

function toDozens(num) {
  let roman = "";
  let dozens = getDigitFromNumber(num, 2);
  switch(dozens) {
    case 10:
      roman = "X";
      break;
    case 20:
      roman = "XX";
      break;
    case 30:
      roman = "XXX";
      break;
    case 40:
      roman = "XL";
      break;
    case 50:
      roman = "L";
      break;
    case 60:
      roman = "LX";
      break;
    case 70:
      roman = "LXX";
      break;
    case 80:
      roman = "LXXX";
      break;
    case 90:
      roman = "XC";
      break;
  }
  return roman;
}

function toHundreds(num) {
  let roman = "";
  let hundreds = getDigitFromNumber(num, 3);
  switch(hundreds) {
    case 100:
      roman = "C";
      break;
    case 200:
      roman = "CC";
      break;
    case 300:
      roman = "CCC";
      break;
    case 400:
      roman = "CD";
      break;
    case 500:
      roman = "D";
      break;
    case 600:
      roman = "DC";
      break;
    case 700:
      roman = "DCC";
      break;
    case 800:
      roman = "DCCC";
      break;
    case 900:
      roman = "CM";
      break;
  }
  return roman;
}

function toThousands(num) {
  let roman = "";
  let thousands = getDigitFromNumber(num, 4);
  switch(thousands) {
    case 1000:
      roman = "M";
      break;
    case 2000:
      roman = "MM";
      break;
    case 3000:
      roman = "MMM";
      break;
    default:
      roman = "NOT DEFINED ABOVE 3999";
  }
  return roman;
}

//return digit (from a number) counting from the end of that number
//index = 1 (units), 2 (dozens), 3 (hundreds), 4 (thousands), ...
function getDigitFromNumber(num, index) {
  let n = num.toString();
  if(num > 0 & index > 0 & index <= n.length)
    return n[n.length - index] * Math.pow(10, index - 1);
  else
    return 0;
}
//console.log(getDigitFromNumber(1234, 4)); //1000


/*
I = 1, II, III, IV
V = 5, VI, VII, VIII, IX
X = 10, XX, XXX, XL
L = 50, LX, LXX, LXXX, XC
C = 100, CC, CCC, CD
D = 500, DC, DCC, DCCC, CM
M = 1000, MM, MMM -> MMMCMXCIX (3999)
*/