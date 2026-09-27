import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Habitat yang dilindungi harus dipetakan sebelum konstruksi dimulai.",
        },
        {
          isCorrect: false,
          label:
            "Bagian rancangan yang melintasi habitat yang dilindungi harus dipindahkan.",
        },
        {
          isCorrect: true,
          label:
            "Jalur jembatan semula boleh tetap digunakan tanpa perubahan selama konstruksi.",
        },
        {
          isCorrect: false,
          label:
            "Jalur jembatan semula melintasi habitat rangkong yang dilindungi.",
        },
        {
          isCorrect: false,
          label: "Tim memindahkan jalur jembatan sebelum konstruksi.",
        },
      ],
    },
  },
};

export default item;
