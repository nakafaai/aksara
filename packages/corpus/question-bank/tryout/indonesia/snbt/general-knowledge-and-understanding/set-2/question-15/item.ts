import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "paraphrase",
  },
  stimulus: "fansur",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Karena pohon yang kosong dan pohon yang berisi kristal tampak sama dari luar, para pengumpul selalu menebang banyak pohon sebelum mendapat satu yang hasilnya sepadan dengan jerih payah mereka.",
        },
        {
          correct: false,
          label:
            "Karena pohon yang kosong dan pohon yang berisi kristal tampak sama dari luar, para pengumpul biasanya menebang banyak pohon sebelum mendapat satu yang berisi kristal.",
        },
        {
          correct: false,
          label:
            "Karena para pengumpul biasanya menebang banyak pohon, pohon yang kosong dan pohon yang berisi kristal menjadi tampak sama dari luar.",
        },
        {
          correct: true,
          label:
            "Karena pohon yang kosong dan pohon yang berisi kristal tampak sama dari luar, para pengumpul biasanya baru mendapat satu pohon yang hasilnya sepadan dengan jerih payah mereka setelah menebang banyak pohon.",
        },
        {
          correct: false,
          label:
            "Karena pohon yang kosong dan pohon yang berisi kristal tampak sama dari luar, para pengumpul biasanya menebang banyak pohon sebelum mendapat satu yang isinya lebih banyak daripada pohon-pohon lainnya.",
        },
      ],
    },
  },
};

export default item;
