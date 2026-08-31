import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Foto panggung membuktikan bahan kostum yang digunakan karena penampilan visual selalu menunjukkan komposisi material secara tepat.",
        },
        {
          isCorrect: false,
          label:
            "Daftar inventaris lebih lengkap daripada foto sehingga perubahan cara kostum digunakan tidak perlu diteliti.",
        },
        {
          isCorrect: false,
          label:
            "Kesamaan kostum pada satu dekade membuktikan bahwa produksi pertunjukan tidak berubah pada dekade lain.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan antara penggunaan di panggung dan catatan bahan menunjukkan bahwa salah satu sumber salah.",
        },
        {
          isCorrect: true,
          label:
            "Foto memperlihatkan bagaimana kostum digunakan dalam pementasan, sedangkan inventaris mencatat bahan dan perbaikan; gabungan keduanya mendukung penafsiran perubahan produksi tanpa memastikan sebab setiap perubahan.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
