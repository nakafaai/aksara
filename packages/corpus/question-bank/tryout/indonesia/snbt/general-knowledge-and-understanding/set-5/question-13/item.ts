import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "memberi konsekuensi yang sama untuk setiap keterlambatan",
        },
        {
          correct: false,
          label: "memilih konsekuensi terberat yang diizinkan aturan",
        },
        {
          correct: false,
          label: "menentukan konsekuensi hanya dari besarnya pendapatan denda",
        },
        {
          correct: false,
          label: "mengubah konsekuensi secara acak untuk setiap pengguna",
        },
        {
          correct: true,
          label:
            "sebanding dengan tingkat kesalahan dan dampak yang ditimbulkan",
        },
      ],
    },
  },
};

export default item;
