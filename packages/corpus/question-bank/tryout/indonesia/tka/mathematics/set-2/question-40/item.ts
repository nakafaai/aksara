import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "probability",
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
            { kind: "text", text: "Die Wahrscheinlichkeit für Rot ist " },
            { display: "inline", kind: "math", math: "\\frac{5}{9}" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "Die Wahrscheinlichkeit für Blau ist " },
            { display: "inline", kind: "math", math: "\\frac{4}{9}" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            {
              kind: "text",
              text: "Bei einer Ziehung schließen sich die Ereignisse Rot und Blau gegenseitig aus.",
            },
          ],
        },
        {
          correctCategoryOrder: 2,
          label: [
            {
              kind: "text",
              text: "Die Wahrscheinlichkeit für Rot oder Blau ist ",
            },
            { display: "inline", kind: "math", math: "\\frac12" },
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
            { kind: "text", text: "The probability of red is " },
            { display: "inline", kind: "math", math: "\\frac{5}{9}" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "The probability of blue is " },
            { display: "inline", kind: "math", math: "\\frac{4}{9}" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            {
              kind: "text",
              text: "On one draw, the red and blue events are mutually exclusive.",
            },
          ],
        },
        {
          correctCategoryOrder: 2,
          label: [
            { kind: "text", text: "The probability of red or blue is " },
            { display: "inline", kind: "math", math: "\\frac12" },
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
            { kind: "text", text: "Peluang mengambil bola merah adalah " },
            { display: "inline", kind: "math", math: "\\frac{5}{9}" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "Peluang mengambil bola biru adalah " },
            { display: "inline", kind: "math", math: "\\frac{4}{9}" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            {
              kind: "text",
              text: "Dalam satu pengambilan, kejadian merah dan biru saling lepas.",
            },
          ],
        },
        {
          correctCategoryOrder: 2,
          label: [
            {
              kind: "text",
              text: "Peluang memperoleh bola merah atau biru adalah ",
            },
            { display: "inline", kind: "math", math: "\\frac12" },
            { kind: "text", text: "." },
          ],
        },
      ],
    },
  },
};

export default item;
