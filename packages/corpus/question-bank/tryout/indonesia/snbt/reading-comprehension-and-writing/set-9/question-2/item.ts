import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menolak seluruh program sebelum mencobanya",
        },
        {
          correct: false,
          label: "menunggu petugas mengubah tujuan program",
        },
        {
          correct: false,
          label: "tidak mengetahui hasil akhir yang diinginkan pengelola",
        },
        {
          correct: true,
          label:
            "belum yakin tindakan yang harus dilakukan setelah tahap saat ini",
        },
        {
          correct: false,
          label: "memilih langkah berbeda untuk menguji hipotesis",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
