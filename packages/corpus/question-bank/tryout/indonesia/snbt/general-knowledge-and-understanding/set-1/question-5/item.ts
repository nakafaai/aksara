import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "asal mula virus corona.",
        },
        {
          correct: false,
          label:
            "cacar merupakan penyakit yang berbahaya dibandingkan virus corona.",
        },
        {
          correct: true,
          label:
            "penelitian DNA purba tentang sejarah dan evolusi virus variola.",
        },
        {
          correct: false,
          label: "penyebab hilangnya orang Viking.",
        },
        {
          correct: false,
          label: "penyebab punahnya cacar purba.",
        },
      ],
    },
  },
};

export default item;
