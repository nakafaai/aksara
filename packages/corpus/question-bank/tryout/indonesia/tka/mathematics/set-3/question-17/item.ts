import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1$$",
        },
        {
          isCorrect: false,
          label: "$$2$$",
        },
        {
          isCorrect: false,
          label: "$$4$$",
        },
        {
          isCorrect: true,
          label: "$$3$$",
        },
        {
          isCorrect: false,
          label: "$$5$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1$$",
        },
        {
          isCorrect: false,
          label: "$$2$$",
        },
        {
          isCorrect: false,
          label: "$$4$$",
        },
        {
          isCorrect: true,
          label: "$$3$$",
        },
        {
          isCorrect: false,
          label: "$$5$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1$$",
        },
        {
          isCorrect: false,
          label: "$$2$$",
        },
        {
          isCorrect: false,
          label: "$$4$$",
        },
        {
          isCorrect: true,
          label: "$$3$$",
        },
        {
          isCorrect: false,
          label: "$$5$$",
        },
      ],
    },
  },
  stimulusKey: "courtyard-layout",
};

export default item;
