import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "pada Senin, tim menguji tanda genre di setiap meja pasar tukar buku.",
        },
        {
          correct: false,
          label:
            "Pada senin, tim menguji tanda genre di setiap meja pasar tukar buku.",
        },
        {
          correct: true,
          label:
            "Pada Senin, tim menguji tanda genre di setiap meja pasar tukar buku.",
        },
        {
          correct: false,
          label:
            "Pada Senin, Tim menguji tanda genre di setiap meja pasar tukar buku.",
        },
        {
          correct: false,
          label:
            "Pada Senin tim menguji tanda genre di setiap meja pasar tukar buku",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
