import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Stickstoff und Phosphor schädigen Auenböden immer",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Auen können Material nur abgeben und niemals zurückhalten",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Auen können Sedimente und Nährstoffe zurückhalten",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "In Auen sammelt sich Material nur an und geht durch Erosion nie verloren",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jede Überschwemmung macht jeden Auenboden fruchtbarer",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Nitrogen and phosphorus always harm floodplain soils",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Floodplains can only export material and never retain it",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Floodplains can retain sediment and nutrients",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Floodplains only accumulate material and never lose it through erosion",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Every flood makes every floodplain soil more fertile",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Nitrogen dan fosfor selalu merusak tanah dataran banjir",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Dataran banjir hanya dapat melepas bahan dan tidak pernah menahannya",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Dataran banjir dapat menahan sedimen dan unsur hara",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Dataran banjir hanya menumpuk bahan dan tidak pernah kehilangannya akibat erosi",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Setiap banjir membuat semua tanah dataran banjir lebih subur",
            },
          ],
        },
      ],
    },
  },
};

export default item;
