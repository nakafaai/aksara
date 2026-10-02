import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Meskipun demikian tim belum mengukur pemahaman pengunjung.",
        },
        {
          isCorrect: false,
          label: "Meskipun demikian: tim belum mengukur pemahaman pengunjung.",
        },
        {
          isCorrect: false,
          label: "Meskipun demikian, tim, belum mengukur pemahaman pengunjung.",
        },
        {
          isCorrect: true,
          label: "Meskipun demikian, tim belum mengukur pemahaman pengunjung.",
        },
        {
          isCorrect: false,
          label: "Meskipun demikian, tim belum mengukur pemahaman pengunjung?",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
