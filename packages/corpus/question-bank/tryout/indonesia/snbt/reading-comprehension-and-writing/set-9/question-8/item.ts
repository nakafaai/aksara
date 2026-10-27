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
};

export default item;
