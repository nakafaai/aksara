import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Meskipun demikian tim membatasi simpulannya pada uji singkat tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian: tim membatasi simpulannya pada uji singkat tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian; tim membatasi simpulannya pada uji singkat tersebut.",
        },
        {
          isCorrect: true,
          label:
            "Meskipun demikian, tim membatasi simpulannya pada uji singkat tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim membatasi simpulannya pada uji singkat tersebut?",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
