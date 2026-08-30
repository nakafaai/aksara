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
          label: "Der Umfang einer ebenen Figur wird mit $4$ multipliziert.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Der Flächeninhalt einer ebenen Figur wird mit $4^2$ multipliziert.",
        },
        {
          correctCategoryOrder: 1,
          label: "Das Volumen eines Körpers wird mit $4^3$ multipliziert.",
        },
        {
          correctCategoryOrder: 2,
          label: "Die Oberfläche eines Körpers wird mit $4^3$ multipliziert.",
        },
      ],
    },
    en: {
      categories: ["True", "False"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "A plane figure's perimeter is multiplied by $4$.",
        },
        {
          correctCategoryOrder: 1,
          label: "A plane figure's area is multiplied by $4^2$.",
        },
        {
          correctCategoryOrder: 1,
          label: "A solid's volume is multiplied by $4^3$.",
        },
        {
          correctCategoryOrder: 2,
          label: "A solid's surface area is multiplied by $4^3$.",
        },
      ],
    },
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Keliling bangun datar dikalikan $4$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Luas bangun datar dikalikan $4^2$.",
        },
        {
          correctCategoryOrder: 1,
          label: "Volume bangun ruang dikalikan $4^3$.",
        },
        {
          correctCategoryOrder: 2,
          label: "Luas permukaan bangun ruang dikalikan $4^3$.",
        },
      ],
    },
  },
};

export default item;
