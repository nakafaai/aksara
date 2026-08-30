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
              text: "Ein ganzer Apfel vor dem Mittagessen verhindert immer Adipositas.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Alle vier Apfelzubereitungen führten zum gleichen Sättigungsgefühl.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Apfelsaft führte zu einer niedrigeren gesamten Energieaufnahme als der ganze Apfel.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "In dieser Studie erzeugte der ganze Apfel das stärkste Sättigungsgefühl und eine niedrigere gesamte Energieaufnahme als die Bedingung ohne Vorspeise.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Studie bewies, dass allein die Ballaststoffe alle Unterschiede zwischen den Apfelzubereitungen verursachten.",
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
              text: "Eating a whole apple before lunch always prevents obesity.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "All four apple preparations produced the same level of fullness.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Apple juice led to a lower total energy intake than the whole apple.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "In this study, the whole apple produced the greatest fullness and a lower total energy intake than no preload.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The study proved that fiber alone caused every difference between the apple preparations.",
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
              text: "Makan apel utuh sebelum makan siang selalu mencegah obesitas.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Keempat olahan apel menghasilkan tingkat rasa kenyang yang sama.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jus apel menghasilkan total asupan energi yang lebih rendah daripada apel utuh.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Dalam penelitian ini, apel utuh menghasilkan rasa kenyang paling tinggi dan total asupan energi yang lebih rendah daripada kondisi tanpa sajian pendahuluan.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Penelitian ini membuktikan bahwa serat saja menyebabkan seluruh perbedaan di antara olahan apel.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
