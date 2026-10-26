import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Meskipun demikian tim membatasi simpulan pada jenis pohon yang terwakili dalam contoh foto.",
        },
        {
          correct: false,
          label:
            "Meskipun demikian: tim membatasi simpulan pada jenis pohon yang terwakili dalam contoh foto.",
        },
        {
          correct: false,
          label:
            "Meskipun demikian, tim, membatasi simpulan pada jenis pohon yang terwakili dalam contoh foto.",
        },
        {
          correct: false,
          label:
            "Meskipun demikian, tim membatasi simpulan pada jenis pohon yang terwakili dalam contoh foto?",
        },
        {
          correct: true,
          label:
            "Meskipun demikian, tim membatasi simpulan pada jenis pohon yang terwakili dalam contoh foto.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
