import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Meskipun demikian tim membatasi simpulan pada uji singkat di satu lokasi pembibitan.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian: tim membatasi simpulan pada uji singkat di satu lokasi pembibitan.",
        },
        {
          isCorrect: true,
          label:
            "Meskipun demikian, tim membatasi simpulan pada uji singkat di satu lokasi pembibitan.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim, membatasi simpulan pada uji singkat di satu lokasi pembibitan.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim membatasi simpulan pada uji singkat di satu lokasi pembibitan?",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
