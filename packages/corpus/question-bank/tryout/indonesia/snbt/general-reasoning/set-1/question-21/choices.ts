import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Beide Zahlen addieren", value: false },
    { label: "Beide Zahlen multiplizieren", value: false },
    {
      label: "Die erste Zahl quadrieren und die zweite addieren",
      value: true,
    },
    {
      label: "Die zweite Zahl quadrieren und die erste addieren",
      value: false,
    },
    { label: "Die Summe beider Zahlen quadrieren", value: false },
  ],
  en: [
    { label: "Add the two numbers", value: false },
    { label: "Multiply the two numbers", value: false },
    { label: "Square the first number and add the second", value: true },
    { label: "Square the second number and add the first", value: false },
    { label: "Square the sum of the two numbers", value: false },
  ],
  id: [
    { label: "Menjumlahkan kedua bilangan", value: false },
    { label: "Mengalikan kedua bilangan", value: false },
    {
      label: "Mengkuadratkan bilangan pertama, lalu menambah bilangan kedua",
      value: true,
    },
    {
      label: "Mengkuadratkan bilangan kedua, lalu menambah bilangan pertama",
      value: false,
    },
    { label: "Mengkuadratkan jumlah kedua bilangan", value: false },
  ],
};

export default choices;
