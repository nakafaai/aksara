import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menurunkan tekanan darah",
        },
        {
          correct: false,
          label: "mencegah penyakit kardiovaskular",
        },
        {
          correct: true,
          label: "meningkatkan tekanan darah",
        },
        {
          correct: false,
          label: "mempercepat pencernaan",
        },
        {
          correct: false,
          label: "menghilangkan kebutuhan tubuh akan kalium",
        },
      ],
    },
  },
};

export default item;
