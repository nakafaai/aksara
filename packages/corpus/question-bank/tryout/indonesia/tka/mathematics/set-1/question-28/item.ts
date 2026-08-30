import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
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
            { kind: "text", text: "Der Umfang einer ebenen Figur wird mit " },
            { display: "inline", kind: "math", math: "2" },
            { kind: "text", text: " multipliziert." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            {
              kind: "text",
              text: "Der Flächeninhalt einer ebenen Figur wird mit ",
            },
            { display: "inline", kind: "math", math: "2^2" },
            { kind: "text", text: " multipliziert." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "Das Volumen eines Körpers wird mit " },
            { display: "inline", kind: "math", math: "2^3" },
            { kind: "text", text: " multipliziert." },
          ],
        },
        {
          correctCategoryOrder: 2,
          label: [
            { kind: "text", text: "Die Oberfläche eines Körpers wird mit " },
            { display: "inline", kind: "math", math: "2^3" },
            { kind: "text", text: " multipliziert." },
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
            {
              kind: "text",
              text: "A plane figure's perimeter is multiplied by ",
            },
            { display: "inline", kind: "math", math: "2" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "A plane figure's area is multiplied by " },
            { display: "inline", kind: "math", math: "2^2" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "A solid's volume is multiplied by " },
            { display: "inline", kind: "math", math: "2^3" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 2,
          label: [
            { kind: "text", text: "A solid's surface area is multiplied by " },
            { display: "inline", kind: "math", math: "2^3" },
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
            { kind: "text", text: "Keliling bangun datar dikalikan " },
            { display: "inline", kind: "math", math: "2" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "Luas bangun datar dikalikan " },
            { display: "inline", kind: "math", math: "2^2" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 1,
          label: [
            { kind: "text", text: "Volume bangun ruang dikalikan " },
            { display: "inline", kind: "math", math: "2^3" },
            { kind: "text", text: "." },
          ],
        },
        {
          correctCategoryOrder: 2,
          label: [
            { kind: "text", text: "Luas permukaan bangun ruang dikalikan " },
            { display: "inline", kind: "math", math: "2^3" },
            { kind: "text", text: "." },
          ],
        },
      ],
    },
  },
};

export default item;
