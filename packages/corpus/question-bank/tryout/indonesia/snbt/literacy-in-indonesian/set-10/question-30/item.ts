import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Tiga Puluh Dua Lampu yang Pasti Menyala",
        },
        {
          correct: false,
          label: "Perdebatan Pak Udin dan Bu Sari di Dekat Jembatan",
        },
        {
          correct: false,
          label: "Kepala Kantor dan Peta Bersih yang Selesai",
        },
        {
          correct: true,
          label: "Peta Berlapis untuk Cahaya yang Berubah",
        },
        {
          correct: false,
          label: "Gang Gelap yang Tidak Pernah Diperiksa",
        },
      ],
    },
  },
  stimulus: "passage-6",
};

export default item;
