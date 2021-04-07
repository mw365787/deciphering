# deciphering
This app was created to support my Cryptography assignment. All the functionality was made for the purposed of completing the objectives of assignment.
!! Please take into account the app processes strings without spaces and symbols ie. 'IWFHWFFWHFWFFWHAFWQKFGIE' not 'I AW, HFWMWHF. JWAGHFWICN.'
!! I attached a file with a text and exercises for each functionality.

### Exercise 1) The plaintext comes from tess26.txt and is encoded with a Caesar cipher. --
My implementation of Ceasar Cipher works only on longer texts (singular sentences won't decode). Usually 3 and more sentences is good starting point.


### Exercise 2) The plaintext comes from tess26.txt and is encoded with a Vigenere cipher using the 21-letter key TESSOFTHEDURBERVILLES.
This implementation is using the Vigenere Cipher with a keyword 'TESSOFTHEDURBERVILLES'.
 
### Exercise 3) The plaintext comes from tess26.txt and is encoded with a Vigenere cipher. The key is an arbitrary sequence of six letters (i.e. not necessarily forming an English word).
Here you can encode your text with any combination of six letters and it will decode it.
I used Chi Statistics which calculates the ocurrence of every letter against the template ocurrence of this letter in english alphabet.
After adding all the values together, the smallest value of Chi Statistic will signify that this decoded text is English.
There are references in the code in ciphers.js


### Exercise 4) The plaintext comes from tess26.txt and is encoded with a Vigenere cipher. The key is an arbitrary sequence of between 4 and 6 letters. 
It's very similiar methodology as with exercise3 but you have to check 4, 5 and 6 letter sequences.


### Exercise 5) The plaintext comes from tess26.txt and is encoded with a transposition cipher, asfollows: the plaintext is written row-wise across a certain number of columns, between 4 and 6. (You must figure out how many columns were used.) The ciphertext is formed by reading out successive columns from left to right.
This cipher checks all of the cases with 4, 5 and 6 columns. We use chi statistics for each case and 
look which one is the most similiar to English.


### Exercise 6) The plaintext comes from tess26.txt and is encoded with a transposition cipher, asfollows: the plaintext is written row-wise across six columns. The ciphertext is formed by reading out successive columns in an arbitrary order (which you must figure out to decipher the message). Hint:look for common pairs of letters, such as 'th'.
I used brute-force methodology and checked all 6! permutations so I could check each sequence of columns.
Then, I decoded cipher with each sequence and counter bigrams in each text. The one with the biggest value would be
the most similiar to English.
