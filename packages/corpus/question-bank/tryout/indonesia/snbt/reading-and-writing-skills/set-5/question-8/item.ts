import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Meskipun demikian tim membatasi simpulan pada jenis pohon yang terwakili dalam contoh foto.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian: tim membatasi simpulan pada jenis pohon yang terwakili dalam contoh foto.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim, membatasi simpulan pada jenis pohon yang terwakili dalam contoh foto.",
        },
        {
          isCorrect: false,
          label:
            "Meskipun demikian, tim membatasi simpulan pada jenis pohon yang terwakili dalam contoh foto?",
        },
        {
          isCorrect: true,
          label:
            "Meskipun demikian, tim membatasi simpulan pada jenis pohon yang terwakili dalam contoh foto.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
