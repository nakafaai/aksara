import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Perkembangan Jati terlihat karena jumlah pertanyaannya berkurang setelah Mira menjelaskan kalimat tersebut.",
        },
        {
          isCorrect: true,
          label:
            "Perkembangan Jati ditandai oleh perubahan cara memperlakukan pertanyaan: dari sesuatu yang disembunyikan menjadi bahan penafsiran yang dapat diuji bersama.",
        },
        {
          isCorrect: false,
          label:
            "Kesediaan membuka pertemuan berikutnya membuktikan bahwa Jati sudah menjadi pembaca paling mahir dalam kelompok.",
        },
        {
          isCorrect: false,
          label:
            "Dua pertanyaan pada akhir cerita menunjukkan bahwa Jati gagal berkembang karena masalahnya bertambah.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan Jati hanya disebabkan oleh pujian Mira, meskipun cerita tidak menyebut adanya pujian.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
