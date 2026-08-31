import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Proporsi pasien yang tidak kembali meningkat 14 persen karena selisih jumlah pasiennya adalah 56 dikurangi 42.",
        },
        {
          isCorrect: false,
          label:
            "Proporsi pasien yang tidak kembali meningkat dari sekitar 67 persen menjadi sekitar 70 persen, yaitu 3 poin persentase.",
        },
        {
          isCorrect: false,
          label:
            "Penanda baru menghasilkan tingkat keberhasilan sekitar 133 persen dibandingkan penanda lama karena 56 dibagi 42 bernilai sekitar 1,33.",
        },
        {
          isCorrect: true,
          label:
            "Proporsi pasien yang tidak kembali meningkat dari 70 persen menjadi sekitar 93,3 persen, sehingga selisihnya sekitar 23,3 poin persentase.",
        },
        {
          isCorrect: false,
          label:
            "Proporsi pasien yang tidak kembali meningkat 33,3 poin persentase karena hasil penanda baru sekitar sepertiga lebih besar daripada hasil penanda lama.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
