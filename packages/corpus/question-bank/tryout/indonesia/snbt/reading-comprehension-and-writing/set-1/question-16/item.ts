import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "title",
  },
  stimulus: "waste-bank",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Harga Kardus yang Terus Naik",
        },
        {
          correct: false,
          label: "Jenis-Jenis Sampah Anorganik",
        },
        {
          correct: true,
          label: "Menabung Sampah di Bank Sampah Sejahtera",
        },
        {
          correct: false,
          label: "Pembagian Tempat Sampah Terpilah",
        },
        {
          correct: false,
          label: "Kegiatan Warga Kelurahan Mekar pada Hari Sabtu",
        },
      ],
    },
  },
};

export default item;
