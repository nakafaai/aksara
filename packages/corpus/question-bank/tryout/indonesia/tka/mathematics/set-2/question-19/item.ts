import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  responses: {
    de: {
      categories: ["Richtig", "Falsch"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Die kleinste mögliche Fläche ist $78{,}21$ cm².",
        },
        {
          correctCategoryOrder: 1,
          label: "Die größte mögliche Fläche ist $81{,}81$ cm².",
        },
        {
          correctCategoryOrder: 1,
          label: "Der Umfang liegt zwischen $35{,}6$ cm und $36{,}4$ cm.",
        },
        {
          correctCategoryOrder: 2,
          label: "Der maximale absolute Flächenfehler beträgt $1{,}8$ cm².",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Der maximale relative Flächenfehler ist größer als $2{,}2\\%$.",
        },
      ],
    },
    en: {
      categories: ["True", "False"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "The least possible area is $78.21$ cm².",
        },
        {
          correctCategoryOrder: 1,
          label: "The greatest possible area is $81.81$ cm².",
        },
        {
          correctCategoryOrder: 1,
          label: "The perimeter lies between $35.6$ cm and $36.4$ cm.",
        },
        {
          correctCategoryOrder: 2,
          label: "The greatest absolute area error is $1.8$ cm².",
        },
        {
          correctCategoryOrder: 1,
          label: "The greatest relative area error exceeds $2.2\\%$.",
        },
      ],
    },
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Luas minimum yang mungkin adalah $78{,}21$ cm².",
        },
        {
          correctCategoryOrder: 1,
          label: "Luas maksimum yang mungkin adalah $81{,}81$ cm².",
        },
        {
          correctCategoryOrder: 1,
          label: "Keliling berada di antara $35{,}6$ cm dan $36{,}4$ cm.",
        },
        {
          correctCategoryOrder: 2,
          label: "Galat luas absolut terbesar adalah $1{,}8$ cm².",
        },
        {
          correctCategoryOrder: 1,
          label: "Galat luas relatif terbesar melebihi $2{,}2\\%$.",
        },
      ],
    },
  },
};

export default item;
