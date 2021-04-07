var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// Modulo in programming language doesn't care if
// number is negative.
// This function takes care of negative numbers.
function modulo(a, n){
    if(a >= 0){
        return a%n;
    }else{
        return (a%n) + n;
    }
}

//function to find property based on its value
function findValue(value, object) {
    for (var key in object) {
        if (object[key] == value) return key;
    }
    return false;
}

//bubbleSort for arrays
function bubbleSort(array){
    var test = false;

    for(var i = 0; i < array.length; i++){
        for(var j = 0; j < array.length-1; j++){
            if(array[j][1] < array[j+1][1]){
                var temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }
    
    return array;
}


//this function selects cipher according to the select menu we provide in HTML
function selectCipher(text, select) {
    text.toUpperCase();
    document.getElementById("plaintext").innerHTML = "";
    switch(select){
        case 'Ceasar':
            var chiStat = [];
            for(var key = 0; key < alphabet.length; key++){
                var plaintext = Ceasar(text,key);
                chiStat[key] = chiStatistic(plaintext);   
            }

            var resultKey = chiStat.indexOf(Math.min(...chiStat));
            console.log(resultKey);
            document.getElementById("plaintext").innerHTML = Ceasar(text, resultKey);
            break;
        case 'Vigenere21key':
            document.getElementById("plaintext").innerHTML = VigenereAnyKey(text, "TESSOFTHEDURBERVILLES");
            break;
        case 'Vigenere6key':
            document.getElementById("plaintext").innerHTML = VigenereAnyKey(text, Vigenere6key(text));
            break;
        case 'Vigenere4to6key':
            document.getElementById("plaintext").innerHTML = VigenereAnyKey(text, Vigenere4to6key(text));
            break;
        case 'Transposition4to6col':
            document.getElementById("plaintext").innerHTML = Transposition4to6col(text);
            break;
        case 'Transposition6col':
            document.getElementById("plaintext").innerHTML = Transposition6col(text);
            break;
    }
}

// Function that follows formula which gives each letter a value based on its ocurrence in the text.
// It returns the sum of all leters of given text. The lower the value, the more likely it is an English text.
function chiStatistic(text){
        
    var result = [];                                                                                                            //inspiration: http://practicalcryptography.com/cryptanalysis/text-characterisation/chi-squared-statistic/
    var frequency = []; var englishFrequency = [];  
    englishFrequency = [['A', 0.082], ['B', 0.015], ['C', 0.028], ['D', 0.043], ['E', 0.13],
                        ['F', 0.022], ['G', 0.02], ['H', 0.061], ['I', 0.07], ['J', 0.0015],
                        ['K', 0.0077], ['L', 0.04], ['M', 0.024], ['N', 0.067], ['O', 0.075],
                        ['P', 0.019], ['Q', 0.00095], ['R', 0.06], ['S', 0.063], ['T', 0.091],
                        ['U', 0.028], ['V', 0.0098], ['W', 0.024], ['X', 0.0015], ['Y', 0.02],
                        ['Z', 0.00074]]
    
                                                    
    for(var i = 0; i<alphabet.length; i++){         
        frequency.push([alphabet[i], 0]);
    }

    for(var i = 0; i < text.length; i++){
        frequency[alphabet.indexOf(text[i])][1]++;
    }

    var sum = 0; var arr = [];
    for(var i = 0; i < frequency.length; i++){
        var temp = frequency[i][1];
        var expectedOcurrence = text.length * englishFrequency[i][1];
        result = (Math.pow((temp - expectedOcurrence), 2))/expectedOcurrence;                   // <------- THIS IS FORMULA
        sum += result;
    }

    return sum;
}




// Ceasar cipher is substition cipher that 
// replaces letter by the n letters on in alphabet eg. 'A' is 'D'
function Ceasar(text, key) {
    
    var result = "";

            for (var i = 0; i < text.length; i++) {
                    var singleLetter = alphabet.indexOf(text[i]);                 //from encrypted single letter we find the position
                    var value = modulo(singleLetter - key, 26);                   //of our decrypted letter by using modulo(3, 26);
                    result += alphabet[value];
                }  
                                                                      
        return result; 
}


//Vigenere cipher decoder for any keyword. In exercises the keyword was TESSOFTHEDURBERVILLES.
function VigenereAnyKey(text, keyword){
    var keys = [];

    for(var i = 0; i < keyword.length; i++){
        keys[i] = alphabet.indexOf(keyword[i]);         //assigning key value for each letter of keyword
    }


    var result = "";
    var j = 0;
    for(var i = 0; i < text.length; i++){
        if(j == keyword.length){                       //checking if we wrap around the keyword
            j = 0;
        }                                 //j is and index of our keys array which stores the key values for our cipher
        
        var singleLetter = alphabet.indexOf(text[i]);
        var value = modulo(singleLetter - keys[j], 26);
        result += alphabet[value];
        j++;
    }

    return result;
}


//Vigenere cipher decoder with 6-letter keyword of arbitrary characters
function Vigenere6key(text){
    var keyword = "";                                                               //  idea is to break cipher in keyword.length parts.
    var splitCipher = [];                                                           //  then to each part we apply ceasar cipher and from each key we put together a keyword for our Vigenere cipher.
    for(var i = 0; i < 6; i++){                                                     //  inspiration: https://coderanch.com/t/716387/java/break-Vigen-cipher-length-key
        splitCipher[i] = "";                                                        
        for(var j = i; j < text.length; j = j + 6){
            splitCipher[i] += text[j];
        }

        var chiStat = [];
        for(var key = 0; key < alphabet.length; key++){
          var decipher = Ceasar(splitCipher[i], key);
          chiStat[key] = chiStatistic(decipher);
        }

        keyword += alphabet[chiStat.indexOf(Math.min(...chiStat))];
        
        //keyword += alphabet[Ceasar(splitCipher[i])];
    }

    console.log(keyword);
    return keyword;
}


//Vigenere cipher decoder for 4-6 letter keyword of arbitrary characters
function Vigenere4to6key(text){

    var chiSum = [];  var keys = []; var index = 0;
    for(var l = 4; l < 7; l++){
        var keyword = "";                                                                       // inspiration: http://practicalcryptography.com/cryptanalysis/stochastic-searching/cryptanalysis-vigenere-cipher/
        var splitCipher = [];
        for(var i = 0; i < l; i++){
            splitCipher[i] = "";
            for(var j = i; j < text.length; j+= l){
                splitCipher[i] += text[j];
            }

            var chiStat = []; 
            for(var key = 0; key < alphabet.length; key++){
                var decipher = Ceasar(splitCipher[i], key);
                chiStat[key] = chiStatistic(decipher);                              // applying chiStatistics to each fragment
            }
            keyword += alphabet[chiStat.indexOf(Math.min(...chiStat))];
        }
        keys[index] = keyword;                                                              // keys are all of our keywords and chiSum is chiStatistics function applied to deciphered text of keywords.
        chiSum[index] = chiStatistic(VigenereAnyKey(text, keyword));
        index++;
        
    }

    var resultKey = keys[chiSum.indexOf(Math.min(...chiSum))];
    return resultKey;
}

//this function checks 3 cases of 4,5 and 6 columns. 
//I use Chi Statistic to calculate which case is most similiar to english.
function Transposition4to6col(text){

    
    
    var chiSum = []; var columns = [4, 5, 6]; ciphers = [];
    var chiSumIndex = 0;
    for(var l = 4; l < 7; l++){
    var index = 0;
    var table = [];
    var decipher = [];
    var rowWrap = text.length / l;              // you need to divide text in 4/5/6 columns so you know when do you wrap your row while writing the into columns
    
    for(var c = 0; c < l; c++){                                     
        table[c] = "";
        for(var r = 0; r < rowWrap; r++){
            table[c] += text[index];
            index++;
        }
    }
    console.table(table);

    index = 0;
    for(var r = 0; r < rowWrap; r++){
        decipher[r] = "";                                   // you decipher it by writing it into a String row-wise.
        for(var c = 0; c < l; c++){
            decipher[r] += table[c][r];
            index++
        }  
    }
    ciphers[chiSumIndex] = decipher.join('');
    chiSum[chiSumIndex] = chiStatistic(ciphers[chiSumIndex]);                       // you calculate chistatistics of every case
    chiSumIndex++;

}


return ciphers[2];      // answer is that it was encrypted in 6 column manner
}


function Transposition6col(text){

    var rowWrap = text.length / 6;
    var table = []; var index = 0;
    for(var c = 0; c < 6; c++){                                     
        table[c] = "";
        for(var r = 0; r < rowWrap; r++){
            table[c] += text[index];
            index++;
        }
    }

    var permuteArray = []; var bigramCount = []; var storedCiphers = [];
    permuteArray = permute([0, 1, 2, 3, 4, 5]);                             // I used permutation function to list all permutations of 1-6.

    for(var i = 0; i < permuteArray.length; i++){

   
    index = 0; var decipher = [];
    for(var r = 0; r < rowWrap; r++){
        decipher[r] = "";

        for(var c = 0; c < 6; c++){
            var n = permuteArray[i][c];
            decipher[r] += table[n][r];
            index++;
        }  
    }
    storedCiphers[i] = decipher.join('');                                   // we store decrypted ciphers and we count most popular bigrams for each of them.
    bigramCount[i] = bigramCounter(decipher.join(''));
    }

    var result = bigramCount.indexOf(Math.max(...bigramCount));             // the english plaintext should have the biggest number of bigrams.
    var ind = permuteArray[result];
    console.log("Permute number: " + result + " -> " + ind);

    return storedCiphers[result];

}

//this function was found on the internet to help me permutate all the possible columns

function permute(permutation) {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;
  
    while (i < length) {
      if (c[i] < i) {
        k = i % 2 && c[i];
        p = permutation[i];
        permutation[i] = permutation[k];
        permutation[k] = p;
        ++c[i];
        i = 1;
        result.push(permutation.slice());
      } else {
        c[i] = 0;
        ++i;
      }
    }
    return result;
  }

  // simpe function that counts the ocurrences of most popular bigrams in english language.
  function bigramCounter(text){

        var count = 0;
        var biagrams = ["TH", "AN", "ON", "NT", "OR"];
        for(var i = 0; i < text.length; i++){
            if(biagrams.includes(text[i].concat(text[i+1]))){
                count++;
            }
        }

    return count;
  }
  


