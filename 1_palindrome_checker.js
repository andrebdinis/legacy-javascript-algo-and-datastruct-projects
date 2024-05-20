function palindrome(str) {
  let newStr = str
  .toLowerCase()
  .match(/[a-z1-9]*/g)
  .join("");
  let length = 0;

  //SE METADE FOR N.º ÍMPAR, senão N.º PAR
  if (newStr.length % 2 !== 0) 
    length = Math.round(newStr.length / 2) - 1;
  else
    length = newStr.length / 2;
  
  let leftW = newStr.slice(0, length);
  let rightW = newStr.slice(newStr.length - length);
  let reversedRightW = rightW.split("").reverse().join("");

  if (leftW === reversedRightW)
    return true;
  return false;
}

palindrome("0_0 (: /-\ :) 0-0") //true
palindrome("almostomla")
palindrome("_eye");
palindrome("A man, a plan, a canal. Panama")
palindrome("My age is 0, 0 si ega ym.")
