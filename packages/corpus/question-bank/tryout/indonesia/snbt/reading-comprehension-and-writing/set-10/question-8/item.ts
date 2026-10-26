import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Meskipun demikian, tim membatasi simpulan pada uji singkat dengan jenis resep tersebut.",
        },
        {
          correct: false,
          label:
            "Meskipun demikian tim membatasi simpulan pada uji singkat dengan jenis resep tersebut.",
        },
        {
          correct: false,
          label:
            "Meskipun demikian: tim membatasi simpulan pada uji singkat dengan jenis resep tersebut.",
        },
        {
          correct: false,
          label:
            "Meskipun demikian, tim, membatasi simpulan pada uji singkat dengan jenis resep tersebut.",
        },
        {
          correct: false,
          label:
            "Meskipun demikian, tim membatasi simpulan pada uji singkat dengan jenis resep tersebut?",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
