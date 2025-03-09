//Create a program that lists every 3rd number between 1-20 and prints it to the console.

let numbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

for (let i = 2; i < numbers.length; i += 3) {
  console.log(numbers[i]);
}
