import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Habitat yang dilindungi harus dipetakan sebelum konstruksi dimulai.",
        },
        {
          correct: false,
          label:
            "Bagian rancangan yang melintasi habitat yang dilindungi harus dipindahkan.",
        },
        {
          correct: true,
          label:
            "Jalur jembatan semula boleh tetap digunakan tanpa perubahan selama konstruksi.",
        },
        {
          correct: false,
          label:
            "Jalur jembatan semula melintasi habitat rangkong yang dilindungi.",
        },
        {
          correct: false,
          label: "Tim memindahkan jalur jembatan sebelum konstruksi.",
        },
      ],
    },
  },
};

export default item;
