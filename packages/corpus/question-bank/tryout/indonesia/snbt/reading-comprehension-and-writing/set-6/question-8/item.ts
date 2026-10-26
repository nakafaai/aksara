import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
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
  stimulus: "passage-1",
};

export default item;
