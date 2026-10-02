import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Meskipun demikian, tim membatasi simpulan pada uji singkat dengan jenis resep tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian tim membatasi simpulan pada uji singkat dengan jenis resep tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian: tim membatasi simpulan pada uji singkat dengan jenis resep tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim, membatasi simpulan pada uji singkat dengan jenis resep tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim membatasi simpulan pada uji singkat dengan jenis resep tersebut?",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
