import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
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
  stimulus: "passage-1",
};

export default item;
