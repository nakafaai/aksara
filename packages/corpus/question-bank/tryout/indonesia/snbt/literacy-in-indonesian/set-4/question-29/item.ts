import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-6",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Istilah *foreshadowing* memastikan sejak awal bahwa tim pasti membatalkan seluruh rencana pengecatan.",
        },
        {
          correct: false,
          label:
            "Definisi itu menjadikan setiap warna yang disebut dua kali sebagai foreshadowing meskipun tidak berkaitan dengan penemuan berikutnya.",
        },
        {
          correct: true,
          label:
            "Definisi *foreshadowing* menjelaskan cara serpihan kecil pada awal cerita menyiapkan penemuan garis pintu biru dan bukti arsip pada bagian berikutnya.",
        },
        {
          correct: false,
          label:
            "Penyebutan *foreshadowing* membuat setiap dugaan pembaca benar meskipun tidak didukung pengulangan warna atau foto arsip.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut hanya menerangkan usia bangunan sehingga keputusan Galih untuk menunda pengecatan tidak relevan.",
        },
      ],
    },
  },
};

export default item;
