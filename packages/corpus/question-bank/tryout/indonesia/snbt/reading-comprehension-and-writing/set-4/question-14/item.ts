import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Data di kumpulkan di pasar tukar buku dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label:
            "Data dikumpulkan didepan pasar tukar buku dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label:
            "Data mengumpulkan di pasar tukar buku dan kemudian membandingkan.",
        },
        {
          correct: true,
          label:
            "Data dikumpulkan di pasar tukar buku dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label:
            "Data dikumpulkan pada di pasar tukar buku lalu di bandingkan.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
