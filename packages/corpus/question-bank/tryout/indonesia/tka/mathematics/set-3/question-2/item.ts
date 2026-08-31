import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$5{,}5$$",
        },
        {
          isCorrect: false,
          label: "$$9{,}9$$",
        },
        {
          isCorrect: true,
          label: "$$11{,}1$$",
        },
        {
          isCorrect: false,
          label: "$$10$$",
        },
        {
          isCorrect: false,
          label: "$$16{,}6$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$5{,}5$$",
        },
        {
          isCorrect: false,
          label: "$$9{,}9$$",
        },
        {
          isCorrect: true,
          label: "$$11{,}1$$",
        },
        {
          isCorrect: false,
          label: "$$10$$",
        },
        {
          isCorrect: false,
          label: "$$16{,}6$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$5{,}5$$",
        },
        {
          isCorrect: false,
          label: "$$9{,}9$$",
        },
        {
          isCorrect: true,
          label: "$$11{,}1$$",
        },
        {
          isCorrect: false,
          label: "$$10$$",
        },
        {
          isCorrect: false,
          label: "$$16{,}6$$",
        },
      ],
    },
  },
};

export default item;
