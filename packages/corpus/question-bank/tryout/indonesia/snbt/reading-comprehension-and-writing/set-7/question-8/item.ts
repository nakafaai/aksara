import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Meskipun demikian tim tidak menganggap pemesanan awal selalu mengurangi sisa makanan.",
        },
        {
          correct: true,
          label:
            "Meskipun demikian, tim tidak menganggap pemesanan awal selalu mengurangi sisa makanan.",
        },
        {
          correct: false,
          label:
            "Meskipun demikian: tim tidak menganggap pemesanan awal selalu mengurangi sisa makanan.",
        },
        {
          correct: false,
          label:
            "Meskipun demikian, tim, tidak menganggap pemesanan awal selalu mengurangi sisa makanan.",
        },
        {
          correct: false,
          label:
            "Meskipun demikian, tim tidak menganggap pemesanan awal selalu mengurangi sisa makanan?",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
