import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Simpulan tersebut pasti benar",
        },
        {
          correct: false,
          label: "Simpulan tersebut mungkin benar, tetapi tidak pasti",
        },
        {
          correct: false,
          label: "Simpulan tersebut pasti salah",
        },
        {
          correct: false,
          label: "Simpulan tersebut tidak relevan dengan informasi",
        },
        {
          correct: false,
          label:
            "Simpulan tersebut tidak dapat dinilai dari informasi yang ada",
        },
      ],
    },
  },
};

export default item;
