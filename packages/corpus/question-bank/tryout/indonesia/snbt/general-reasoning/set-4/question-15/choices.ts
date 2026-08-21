import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Der Preis von Nudel A ist nie gesunken", value: false },
    {
      label: "Der Preis von Nudel B ist in jedem Zeitraum gestiegen",
      value: false,
    },
    {
      label: "Bei einem Nudelprodukt sank der Preis genau einmal",
      value: true,
    },
    {
      label: "Bei jedem Produkt gab es mehr Anstiege als Rückgänge",
      value: false,
    },
    {
      label: "Der Preis von Nudel A lag jedes Jahr unter Rp $$3000$$",
      value: false,
    },
  ],
  en: [
    { label: "The price of Noodle A never decreased", value: false },
    {
      label: "The price of Noodle B increased in every interval",
      value: false,
    },
    {
      label: "One noodle product experienced exactly one price decrease",
      value: true,
    },
    { label: "Every product rose more often than it fell", value: false },
    {
      label: "The price of Noodle A stayed below Rp $$3000$$ every year",
      value: false,
    },
  ],
  id: [
    { label: "Harga Mie A tidak pernah turun", value: false },
    { label: "Harga Mie B naik pada setiap periode", value: false },
    {
      label:
        "Ada satu produk mie yang mengalami tepat satu kali penurunan harga",
      value: true,
    },
    { label: "Setiap produk lebih sering naik daripada turun", value: false },
    {
      label: "Harga Mie A selalu di bawah Rp $$3000$$ setiap tahun",
      value: false,
    },
  ],
};

export default choices;
