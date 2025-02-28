function powMod(base, exponent, modulus) {
  if (modulus === 1) return 0; // Modulus 1 always results in 0
  let result = 1;
  base = base % modulus; // Reduce the base to a smaller number
  while (exponent > 0) {
      if (exponent % 2 === 1) {
          result = (result * base) % modulus;
      }
      exponent = Math.floor(exponent / 2);
      base = (base * base) % modulus;
  }
  return result;
}




  document.getElementById('inter').addEventListener('submit', function (event) {
      event.preventDefault();
      const out = document.getElementById('output');
      const err = document.getElementById('error');
      out.innerText = "";
      err.innerText = ""; 


      const primeValue = document.getElementById('prime').value;
      const bobValue = document.querySelector('input[name="bob"]:checked').value;
      const aliceValue = document.getElementById('alice').value;
      const g = 2;

      if (!isNaN(primeValue) && primeValue !== '') {
          if (!isNaN(bobValue) && bobValue !== '') {
              if (!isNaN(aliceValue) && aliceValue !== '') {
                  if (aliceValue < primeValue - 1 && aliceValue > 0) {
                      console.log('Prime:', primeValue);
                      console.log("Bob's Secret Key:", bobValue);
                      console.log("Alice's Secret Key:", aliceValue);
                  } else {
                      err.innerText = 'Error: Please choose a number for Alice between 1 and the prime value - 1.';
                      return;
                  }
              } else {
                  err.innerText = 'Error: Please choose a number for Alice.';
                  return;
              }
          } else {
              err.innerText = 'Error: Please choose a value for Bob.';
              return;
          }
      } else {
          err.innerText = 'Error: Please choose a value for your prime.';
          return;
      }

      var sharedKey = powMod(g, aliceValue, primeValue);
      sharedKey = powMod(sharedKey, bobValue, primeValue);

      out.innerText = "Shared key: " + sharedKey;
      return;
  });


// Make a GET request to the '/getRandomEntry' endpoint

// Function to fetch random entry from the server
