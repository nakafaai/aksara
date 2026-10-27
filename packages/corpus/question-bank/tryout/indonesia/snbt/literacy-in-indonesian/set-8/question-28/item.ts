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
            "Perkembangan Jati terlihat karena jumlah pertanyaannya berkurang setelah Mira menjelaskan kalimat tersebut.",
        },
        {
          correct: true,
          label:
            "Perkembangan Jati ditandai oleh perubahan cara memperlakukan pertanyaan: dari sesuatu yang disembunyikan menjadi bahan penafsiran yang dapat diuji bersama.",
        },
        {
          correct: false,
          label:
            "Kesediaan membuka pertemuan berikutnya membuktikan bahwa Jati sudah menjadi pembaca paling mahir dalam kelompok.",
        },
        {
          correct: false,
          label:
            "Dua pertanyaan pada akhir cerita menunjukkan bahwa Jati gagal berkembang karena masalahnya bertambah.",
        },
        {
          correct: false,
          label:
            "Perubahan Jati hanya disebabkan oleh pujian Mira, meskipun cerita tidak menyebut adanya pujian.",
        },
      ],
    },
  },
};

export default item;
