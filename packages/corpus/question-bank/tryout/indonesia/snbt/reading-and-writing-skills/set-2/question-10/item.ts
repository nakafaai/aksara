import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "($$3$$)-($$5$$)-($$2$$)-($$4$$)-($$1$$).",
        },
        {
          isCorrect: false,
          label: "($$2$$)-($$4$$)-($$3$$)-($$5$$)-($$1$$).",
        },
        {
          isCorrect: false,
          label: "($$3$$)-($$1$$)-($$5$$)-($$2$$)-($$4$$).",
        },
        {
          isCorrect: false,
          label: "($$1$$)-($$3$$)-($$2$$)-($$4$$)-($$5$$).",
        },
        {
          isCorrect: false,
          label: "($$5$$)-($$2$$)-($$3$$)-($$1$$)-($$4$$).",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "($$3$$)-($$5$$)-($$2$$)-($$4$$)-($$1$$).",
        },
        {
          isCorrect: false,
          label: "($$2$$)-($$4$$)-($$3$$)-($$5$$)-($$1$$).",
        },
        {
          isCorrect: false,
          label: "($$3$$)-($$1$$)-($$5$$)-($$2$$)-($$4$$).",
        },
        {
          isCorrect: false,
          label: "($$1$$)-($$3$$)-($$2$$)-($$4$$)-($$5$$).",
        },
        {
          isCorrect: false,
          label: "($$5$$)-($$2$$)-($$3$$)-($$1$$)-($$4$$).",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "($$3$$)-($$5$$)-($$2$$)-($$4$$)-($$1$$).",
        },
        {
          isCorrect: false,
          label: "($$2$$)-($$4$$)-($$3$$)-($$5$$)-($$1$$).",
        },
        {
          isCorrect: false,
          label: "($$3$$)-($$1$$)-($$5$$)-($$2$$)-($$4$$).",
        },
        {
          isCorrect: false,
          label: "($$1$$)-($$3$$)-($$2$$)-($$4$$)-($$5$$).",
        },
        {
          isCorrect: false,
          label: "($$5$$)-($$2$$)-($$3$$)-($$1$$)-($$4$$).",
        },
      ],
    },
  },
};

export default item;
