import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Semua kelompok memperoleh peningkatan yang sebanding karena penyebut pada setiap baris tidak berubah.",
        },
        {
          isCorrect: false,
          label:
            "Kelompok tanpa kebutuhan akses menunjukkan peningkatan terbesar karena 19 dari 20 merupakan hasil tertinggi.",
        },
        {
          isCorrect: false,
          label:
            "Hasil kelompok sensorik turun karena 13 dari 20 lebih kecil daripada 16 dari 20 pada kelompok mobilitas.",
        },
        {
          isCorrect: true,
          label:
            "Manfaat tampak paling besar pada kelompok mobilitas dan kebutuhan majemuk, sedangkan perubahan kecil pada kelompok sensorik menunjukkan ikon masih perlu diperbaiki.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan antarkelompok tidak dapat dibandingkan karena setiap kebutuhan pasti memiliki definisi keberhasilan yang berbeda dalam tabel.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
