import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dalam perbandingan baru dengan jumlah barang yang sama, jalur digital tetap lebih cepat pada semua kelompok usia.",
        },
        {
          correct: true,
          label:
            "Pencatatan waktu digital dimulai setelah barang dipindai, sedangkan waktu tunai dihitung sejak barang pertama diletakkan.",
        },
        {
          correct: false,
          label:
            "Setelah papan petunjuk dibuat lebih terlihat, lebih banyak pembeli lansia memilih jalur digital, tetapi waktu layanan terukur per transaksi tetap sama.",
        },
        {
          correct: false,
          label:
            "Uji berikutnya akan memperbaiki jaringan dan membandingkan jumlah barang yang sebanding.",
        },
        {
          correct: false,
          label:
            "Keluhan sinyal terkonsentrasi pada satu lorong di sisi pasar.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
