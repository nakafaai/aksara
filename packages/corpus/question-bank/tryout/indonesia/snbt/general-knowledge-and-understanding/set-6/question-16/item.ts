import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "membuat bangunan terlihat setua mungkin bagi pengunjung",
        },
        {
          correct: false,
          label: "mempertahankan setiap bahan lama meskipun tidak aman",
        },
        {
          correct: true,
          label:
            "setia pada bukti asal, bahan, dan perubahan yang benar-benar terjadi",
        },
        {
          correct: false,
          label:
            "mengembalikan seluruh bangunan secara seragam ke satu tahun pilihan",
        },
        {
          correct: false,
          label: "menyalin persis gambar lama yang paling populer",
        },
      ],
    },
  },
};

export default item;
