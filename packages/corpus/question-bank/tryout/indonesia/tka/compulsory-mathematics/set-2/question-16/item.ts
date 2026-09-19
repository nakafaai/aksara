import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$48\\pi$$",
        },
        {
          isCorrect: false,
          label: "$$36\\pi-48\\sqrt3$$",
        },
        {
          isCorrect: true,
          label: "$$48\\pi-36\\sqrt3$$",
        },
        {
          isCorrect: false,
          label: "$$36\\pi-24\\sqrt3$$",
        },
        {
          isCorrect: false,
          label: "$$24\\pi-36\\sqrt3$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$48\\pi$$",
        },
        {
          isCorrect: false,
          label: "$$36\\pi-48\\sqrt3$$",
        },
        {
          isCorrect: true,
          label: "$$48\\pi-36\\sqrt3$$",
        },
        {
          isCorrect: false,
          label: "$$36\\pi-24\\sqrt3$$",
        },
        {
          isCorrect: false,
          label: "$$24\\pi-36\\sqrt3$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$48\\pi$$",
        },
        {
          isCorrect: false,
          label: "$$36\\pi-48\\sqrt3$$",
        },
        {
          isCorrect: true,
          label: "$$48\\pi-36\\sqrt3$$",
        },
        {
          isCorrect: false,
          label: "$$36\\pi-24\\sqrt3$$",
        },
        {
          isCorrect: false,
          label: "$$24\\pi-36\\sqrt3$$",
        },
      ],
    },
  },
};

export default item;
