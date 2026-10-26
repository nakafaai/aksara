import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "mengganti *menyediakan* dengan *disediakan*.",
        },
        {
          correct: false,
          label: "menghilangkan kata *juga*.",
        },
        {
          correct: false,
          label: "mengganti *tolok ukur* dengan *perkiraan*.",
        },
        {
          correct: false,
          label: "menambahkan kata *yang* sebelum *terkini*.",
        },
        {
          correct: true,
          label: "menghilangkan kata *mengenai* pada awal kalimat.",
        },
      ],
    },
  },
};

export default item;
