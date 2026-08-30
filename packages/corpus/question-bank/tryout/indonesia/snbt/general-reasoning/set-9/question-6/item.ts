import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Stickstoff und Phosphor schädigen Auenböden immer",
        },
        {
          isCorrect: false,
          label: "Auen können Material nur abgeben und niemals zurückhalten",
        },
        {
          isCorrect: false,
          label:
            "In Auen sammelt sich Material nur an und geht durch Erosion nie verloren",
        },
        {
          isCorrect: false,
          label: "Jede Überschwemmung macht jeden Auenboden fruchtbarer",
        },
        {
          isCorrect: true,
          label: "Auen können Sedimente und Nährstoffe zurückhalten",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Nitrogen and phosphorus always harm floodplain soils",
        },
        {
          isCorrect: false,
          label: "Floodplains can only export material and never retain it",
        },
        {
          isCorrect: false,
          label:
            "Floodplains only accumulate material and never lose it through erosion",
        },
        {
          isCorrect: false,
          label: "Every flood makes every floodplain soil more fertile",
        },
        {
          isCorrect: true,
          label: "Floodplains can retain sediment and nutrients",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Nitrogen dan fosfor selalu merusak tanah dataran banjir",
        },
        {
          isCorrect: false,
          label:
            "Dataran banjir hanya dapat melepas bahan dan tidak pernah menahannya",
        },
        {
          isCorrect: false,
          label:
            "Dataran banjir hanya menumpuk bahan dan tidak pernah kehilangannya akibat erosi",
        },
        {
          isCorrect: false,
          label: "Setiap banjir membuat semua tanah dataran banjir lebih subur",
        },
        {
          isCorrect: true,
          label: "Dataran banjir dapat menahan sedimen dan unsur hara",
        },
      ],
    },
  },
};

export default item;
