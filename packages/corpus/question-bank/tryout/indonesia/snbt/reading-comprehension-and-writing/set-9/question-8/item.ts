import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Meskipun demikian tim membatasi simpulan pada uji singkat di satu lokasi pembibitan.",
        },
        {
          correct: false,
          label:
            "Meskipun demikian: tim membatasi simpulan pada uji singkat di satu lokasi pembibitan.",
        },
        {
          correct: true,
          label:
            "Meskipun demikian, tim membatasi simpulan pada uji singkat di satu lokasi pembibitan.",
        },
        {
          correct: false,
          label:
            "Meskipun demikian, tim, membatasi simpulan pada uji singkat di satu lokasi pembibitan.",
        },
        {
          correct: false,
          label:
            "Meskipun demikian, tim membatasi simpulan pada uji singkat di satu lokasi pembibitan?",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
