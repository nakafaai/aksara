import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dalam perbandingan baru dengan jumlah barang yang sama, jalur digital tetap lebih cepat pada semua kelompok usia.",
        },
        {
          isCorrect: true,
          label:
            "Pencatatan waktu digital dimulai setelah barang dipindai, sedangkan waktu tunai dihitung sejak barang pertama diletakkan.",
        },
        {
          isCorrect: false,
          label:
            "Setelah papan petunjuk dibuat lebih terlihat, lebih banyak pembeli lansia memilih jalur digital, tetapi waktu layanan terukur per transaksi tetap sama.",
        },
        {
          isCorrect: false,
          label:
            "Uji berikutnya akan memperbaiki jaringan dan membandingkan jumlah barang yang sebanding.",
        },
        {
          isCorrect: false,
          label:
            "Keluhan sinyal terkonsentrasi pada satu lorong di sisi pasar.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
