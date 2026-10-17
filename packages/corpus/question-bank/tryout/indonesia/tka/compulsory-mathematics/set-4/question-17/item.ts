import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\text{Rp}1{.}700{.}000$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}3{.}400{.}000$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}4{.}080{.}000$$",
        },
        {
          isCorrect: false,
          label: "$$\\text{Rp}5{.}440{.}000$$",
        },
        {
          isCorrect: true,
          label: "$$\\text{Rp}6{.}800{.}000$$",
        },
      ],
    },
  },
  stimulusKey: "pavilion-roof",
};

export default item;
