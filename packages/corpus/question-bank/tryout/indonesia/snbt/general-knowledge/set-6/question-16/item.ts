import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "membuat bangunan terlihat setua mungkin bagi pengunjung",
        },
        {
          isCorrect: false,
          label: "mempertahankan setiap bahan lama meskipun tidak aman",
        },
        {
          isCorrect: true,
          label:
            "setia pada bukti asal, bahan, dan perubahan yang benar-benar terjadi",
        },
        {
          isCorrect: false,
          label:
            "mengembalikan seluruh bangunan secara seragam ke satu tahun pilihan",
        },
        {
          isCorrect: false,
          label: "menyalin persis gambar lama yang paling populer",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
