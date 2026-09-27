import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Meskipun demikian tim tidak menganggap pemesanan awal selalu mengurangi sisa makanan.",
        },
        {
          isCorrect: true,
          label:
            "Meskipun demikian, tim tidak menganggap pemesanan awal selalu mengurangi sisa makanan.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian: tim tidak menganggap pemesanan awal selalu mengurangi sisa makanan.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim, tidak menganggap pemesanan awal selalu mengurangi sisa makanan.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim tidak menganggap pemesanan awal selalu mengurangi sisa makanan?",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
