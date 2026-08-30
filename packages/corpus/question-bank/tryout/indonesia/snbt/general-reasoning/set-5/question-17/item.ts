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
              text: "Der Beitrag des privaten Konsums bliebe genau bei ",
            },
            { display: "block", kind: "math", math: "2{,}74" },
            { kind: "text", text: " Prozentpunkten" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Der Investitionsbeitrag müsste unter " },
            { display: "block", kind: "math", math: "2{,}17" },
            { kind: "text", text: " Prozentpunkte fallen" },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Der Beitrag des privaten Konsums läge unter ",
            },
            { display: "block", kind: "math", math: "2{,}74" },
            { kind: "text", text: " Prozentpunkten" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Das gesamte Wirtschaftswachstum müsste negativ werden",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der private Konsum würde keinen Beitrag leisten",
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
              text: "The household-consumption contribution would remain exactly ",
            },
            { display: "block", kind: "math", math: "2.74" },
            { kind: "text", text: " percentage points" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The investment contribution would necessarily fall below ",
            },
            { display: "block", kind: "math", math: "2.17" },
            { kind: "text", text: " percentage points" },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The household-consumption contribution would be below ",
            },
            { display: "block", kind: "math", math: "2.74" },
            { kind: "text", text: " percentage points" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Total economic growth would necessarily become negative",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Household consumption would contribute nothing",
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
              text: "Sumbangan konsumsi rumah tangga tetap tepat ",
            },
            { display: "block", kind: "math", math: "2{,}74" },
            { kind: "text", text: " poin persentase" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Sumbangan investasi pasti turun di bawah " },
            { display: "block", kind: "math", math: "2{,}17" },
            { kind: "text", text: " poin persentase" },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Sumbangan konsumsi rumah tangga berada di bawah ",
            },
            { display: "block", kind: "math", math: "2{,}74" },
            { kind: "text", text: " poin persentase" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pertumbuhan ekonomi total pasti menjadi negatif",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Konsumsi rumah tangga tidak memberikan sumbangan sama sekali",
            },
          ],
        },
      ],
    },
  },
};

export default item;
