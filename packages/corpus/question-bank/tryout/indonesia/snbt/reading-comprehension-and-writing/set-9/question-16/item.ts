import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pengguna ruang latihan musik memberikan komentar singkat yang tidak panjang.",
        },
        {
          correct: true,
          label: "Pengguna ruang latihan musik memberikan komentar singkat.",
        },
        {
          correct: false,
          label:
            "Pengguna ruang latihan musik memberikan komentar singkat sebagai pengguna yang memakai ruang latihan musik.",
        },
        {
          correct: false,
          label:
            "Pengguna ruang latihan musik memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          correct: false,
          label:
            "Pengguna ruang latihan musik memberikan komentar singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
