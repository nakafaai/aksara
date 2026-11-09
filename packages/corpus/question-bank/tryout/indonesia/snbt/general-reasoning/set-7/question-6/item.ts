import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "explanation",
  },
  stimulus: "klinik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kunjungan anjing pada bulan April naik dibandingkan bulan Maret.",
        },
        {
          correct: false,
          label: "Klinik itu menambah seorang dokter hewan pada bulan Juni.",
        },
        {
          correct: true,
          label:
            "Kucing yang divaksin pertama kali pada bulan Maret kembali untuk vaksin kedua empat minggu kemudian.",
        },
        {
          correct: false,
          label:
            "Pemilik kucing di kota itu umumnya lebih senang membawa kucingnya ke klinik ketika cuaca sedang cerah.",
        },
        {
          correct: false,
          label: "Tarif pemeriksaan anjing dinaikkan pada awal bulan April.",
        },
      ],
    },
  },
};

export default item;
