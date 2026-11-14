import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "phone-storage",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Memori yang sudah terpakai lebih dari $$65\\,\\%$$ kapasitas memori ponsel.",
        },
        {
          column: 1,
          label:
            "Satu menit video 4K memakai memori lebih dari $$4$$ kali memori satu menit video HD.",
        },
        {
          column: 2,
          label: "Sisa memori cukup untuk merekam video 4K selama $$2$$ jam.",
        },
        {
          column: 2,
          label:
            "Jika Lala menghapus $$2{.}000$$ foto, memori yang terpakai menjadi kurang dari $$70\\text{ GB}$$.",
        },
      ],
    },
  },
};

export default item;
