import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Meskipun demikian tim membatasi simpulan pada pameran yang diuji.",
        },
        {
          correct: false,
          label:
            "Meskipun demikian: tim membatasi simpulan pada pameran yang diuji.",
        },
        {
          correct: false,
          label:
            "Meskipun demikian, tim, membatasi simpulan pada pameran yang diuji.",
        },
        {
          correct: false,
          label:
            "Meskipun demikian, tim membatasi simpulan pada pameran yang diuji?",
        },
        {
          correct: true,
          label:
            "Meskipun demikian, tim membatasi simpulan pada pameran yang diuji.",
        },
      ],
    },
  },
};

export default item;
