import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "canteen-labels",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jumlah siswa yang disurvei terlalu banyak untuk menggambarkan seluruh sekolah.",
        },
        {
          correct: false,
          label:
            "Penjualan makanan berlabel kuning tidak berubah sama sekali selama pencatatan.",
        },
        {
          correct: true,
          label:
            "Kenaikan penjualan hijau mungkin disebabkan turunnya harga, bukan oleh labelnya.",
        },
        {
          correct: false,
          label:
            "Pencatatan seharusnya dilakukan oleh kepala sekolah, bukan oleh guru IPA.",
        },
        {
          correct: false,
          label:
            "Label merah membuat makanan tampak lebih menarik bagi sebagian siswa.",
        },
      ],
    },
  },
};

export default item;
