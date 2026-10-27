import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "pada Senin, tim menguji formulir dengan pilihan lokasi terstruktur.",
        },
        {
          correct: false,
          label:
            "Pada senin, tim menguji formulir dengan pilihan lokasi terstruktur.",
        },
        {
          correct: false,
          label:
            "Pada Senin, Tim menguji formulir dengan pilihan lokasi terstruktur.",
        },
        {
          correct: true,
          label:
            "Pada Senin, tim menguji formulir dengan pilihan lokasi terstruktur.",
        },
        {
          correct: false,
          label:
            "Pada Senin tim menguji formulir dengan pilihan lokasi terstruktur",
        },
      ],
    },
  },
};

export default item;
