import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  responses: {
    de: {
      categories: [
        [{ kind: "text", text: "Richtig" }],
        [{ kind: "text", text: "Falsch" }],
      ],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "Das dritte Glied ist " },
            { display: "inline", kind: "math", math: "12" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "Die Summe der ersten drei Glieder ist " },
            { display: "inline", kind: "math", math: "21" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 2,
          label: [
            { kind: "text", text: "Das fünfte Glied ist " },
            { display: "inline", kind: "math", math: "24" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "Für jedes " },
            { display: "inline", kind: "math", math: "n\\geq1" },
            { kind: "text", text: " gilt " },
            { display: "inline", kind: "math", math: "\\frac{u_{n+1}}{u_n}=2" },
            { kind: "text", text: "." },
          ],
        },
      ],
    },
    en: {
      categories: [
        [{ kind: "text", text: "True" }],
        [{ kind: "text", text: "False" }],
      ],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "The third term is " },
            { display: "inline", kind: "math", math: "12" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "The sum of the first three terms is " },
            { display: "inline", kind: "math", math: "21" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 2,
          label: [
            { kind: "text", text: "The fifth term is " },
            { display: "inline", kind: "math", math: "24" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "For every " },
            { display: "inline", kind: "math", math: "n\\geq1" },
            { kind: "text", text: ", " },
            { display: "inline", kind: "math", math: "\\frac{u_{n+1}}{u_n}=2" },
            { kind: "text", text: "." },
          ],
        },
      ],
    },
    id: {
      categories: [
        [{ kind: "text", text: "Benar" }],
        [{ kind: "text", text: "Salah" }],
      ],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "Suku ketiga adalah " },
            { display: "inline", kind: "math", math: "12" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "Jumlah tiga suku pertama adalah " },
            { display: "inline", kind: "math", math: "21" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 2,
          label: [
            { kind: "text", text: "Suku kelima adalah " },
            { display: "inline", kind: "math", math: "24" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "Untuk setiap " },
            { display: "inline", kind: "math", math: "n\\geq1" },
            { kind: "text", text: ", berlaku " },
            { display: "inline", kind: "math", math: "\\frac{u_{n+1}}{u_n}=2" },
            { kind: "text", text: "." },
          ],
        },
      ],
    },
  },
};

export default item;
