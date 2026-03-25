// Take a number (you can change this value)
let num = 5;

// 1 & 2: Check if number is even or odd
if (num % 2 === 0) {
    console.log(num + " is Even");
} else {
    console.log(num + " is Odd");
}

// 3: Print numbers from 1 to given number
console.log("Numbers from 1 to " + num + ":");
for (let i = 1; i <= num; i++) {
    console.log(i);
}

// 4: Square function
function square(n) {
    return n * n;
}

// Print square of the number
console.log("Square of " + num + " is:", square(num));