import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Istilah *foreshadowing* memastikan sejak awal bahwa tim pasti membatalkan seluruh rencana pengecatan.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menjadikan setiap warna yang disebut dua kali sebagai foreshadowing meskipun tidak berkaitan dengan penemuan berikutnya.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *foreshadowing* menjelaskan cara serpihan kecil pada awal cerita menyiapkan penemuan garis pintu biru dan bukti arsip pada bagian berikutnya.",
        },
        {
          isCorrect: false,
          label:
            "Penyebutan *foreshadowing* membuat setiap dugaan pembaca benar meskipun tidak didukung pengulangan warna atau foto arsip.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut hanya menerangkan usia bangunan sehingga keputusan Galih untuk menunda pengecatan tidak relevan.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
