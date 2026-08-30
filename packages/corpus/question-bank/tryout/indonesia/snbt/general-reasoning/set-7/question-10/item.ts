import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$760\\text{ Personen}$$",
        },
        {
          isCorrect: true,
          label: "$$890\\text{ Personen}$$",
        },
        {
          isCorrect: false,
          label: "$$960\\text{ Personen}$$",
        },
        {
          isCorrect: false,
          label: "$$1060\\text{ Personen}$$",
        },
        {
          isCorrect: false,
          label: "$$1160\\text{ Personen}$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$760\\text{ people}$$" },
        { isCorrect: true, label: "$$890\\text{ people}$$" },
        { isCorrect: false, label: "$$960\\text{ people}$$" },
        { isCorrect: false, label: "$$1060\\text{ people}$$" },
        { isCorrect: false, label: "$$1160\\text{ people}$$" },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "$$760\\text{ orang}$$" },
        { isCorrect: true, label: "$$890\\text{ orang}$$" },
        { isCorrect: false, label: "$$960\\text{ orang}$$" },
        { isCorrect: false, label: "$$1060\\text{ orang}$$" },
        { isCorrect: false, label: "$$1160\\text{ orang}$$" },
      ],
    },
  },
};

export default item;
