import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$87$$" },
        { correct: false, label: "$$92$$" },
        { correct: false, label: "$$96$$" },
        { correct: false, label: "$$104$$" },
        {
          correct: false,
          label:
            "Tidak dapat ditentukan karena banyak siswa setiap kelompok tidak diketahui",
        },
      ],
    },
  },
};

export default item;
