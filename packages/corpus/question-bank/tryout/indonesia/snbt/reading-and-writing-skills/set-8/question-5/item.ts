import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Dennoch",
        },
        {
          isCorrect: false,
          label: "Währenddessen",
        },
        {
          isCorrect: false,
          label: "Umgekehrt",
        },
        {
          isCorrect: true,
          label: "Auf dieser Grundlage",
        },
        {
          isCorrect: false,
          label: "Außerdem",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Nevertheless",
        },
        {
          isCorrect: false,
          label: "Meanwhile",
        },
        {
          isCorrect: false,
          label: "Conversely",
        },
        {
          isCorrect: true,
          label: "On that basis",
        },
        {
          isCorrect: false,
          label: "In addition",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Meskipun demikian",
        },
        {
          isCorrect: false,
          label: "Sementara itu",
        },
        {
          isCorrect: false,
          label: "Sebaliknya",
        },
        {
          isCorrect: true,
          label: "Berdasarkan itu",
        },
        {
          isCorrect: false,
          label: "Di samping itu",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
