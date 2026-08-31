import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Proporsi pasangan yang dapat dibandingkan meningkat 13 persen karena selisih jumlah pasangannya adalah 27 dikurangi 14.",
        },
        {
          isCorrect: false,
          label:
            "Proporsi pasangan yang dapat dibandingkan meningkat dari sekitar 46,7 persen menjadi 90 persen, sehingga kenaikannya 90 poin persentase.",
        },
        {
          isCorrect: false,
          label:
            "Proporsi pasangan yang dapat dibandingkan meningkat sekitar 92,9 poin persentase karena 27 hampir dua kali 14.",
        },
        {
          isCorrect: false,
          label:
            "Sebanyak 90 persen seluruh arsip 40 sumur sudah dapat dibandingkan karena formulir baru berhasil pada 27 pasangan.",
        },
        {
          isCorrect: true,
          label:
            "Proporsi pasangan yang dapat dibandingkan meningkat dari sekitar 46,7 persen menjadi 90 persen, yaitu sekitar 43,3 poin persentase pada uji 30 pasangan.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
