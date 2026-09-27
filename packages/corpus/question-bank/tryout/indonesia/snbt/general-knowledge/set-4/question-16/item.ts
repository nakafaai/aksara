import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "penggambaran batas wilayah tanpa memeriksa nama yang dipakai masyarakat",
        },
        {
          isCorrect: false,
          label: "pengukuran jarak perjalanan antara dua lokasi",
        },
        {
          isCorrect: true,
          label:
            "kajian dan pencatatan nama tempat beserta asal serta konteks pemakaiannya",
        },
        {
          isCorrect: false,
          label: "penyeragaman seluruh nama tempat menjadi satu bentuk resmi",
        },
        {
          isCorrect: false,
          label: "daftar nama baru tanpa riwayat asal dan konteks pemakaiannya",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
