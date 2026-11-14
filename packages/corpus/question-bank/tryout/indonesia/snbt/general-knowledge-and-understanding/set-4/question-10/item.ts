import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "vocabulary",
    topic: "polysemy",
  },
  stimulus: "purnama",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Petugas _membaca_ angka pada meteran listrik setiap awal bulan.",
        },
        {
          correct: false,
          label:
            "Nelayan tua itu _membaca_ arah angin dari gerak awan di kaki langit.",
        },
        {
          correct: false,
          label:
            "Dokter itu _membaca_ kelelahan pasiennya dari cara pasien itu berjalan.",
        },
        {
          correct: false,
          label:
            "Petani _membaca_ datangnya musim hujan dari kemunculan rasi bintang tertentu.",
        },
        {
          correct: false,
          label:
            "Pemain catur itu _membaca_ rencana lawannya dari tiga langkah pembukaannya.",
        },
      ],
    },
  },
};

export default item;
