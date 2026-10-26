import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Meskipun demikian tim belum mengukur pemahaman pengunjung.",
        },
        {
          correct: false,
          label: "Meskipun demikian: tim belum mengukur pemahaman pengunjung.",
        },
        {
          correct: false,
          label: "Meskipun demikian, tim, belum mengukur pemahaman pengunjung.",
        },
        {
          correct: true,
          label: "Meskipun demikian, tim belum mengukur pemahaman pengunjung.",
        },
        {
          correct: false,
          label: "Meskipun demikian, tim belum mengukur pemahaman pengunjung?",
        },
      ],
    },
  },
};

export default item;
