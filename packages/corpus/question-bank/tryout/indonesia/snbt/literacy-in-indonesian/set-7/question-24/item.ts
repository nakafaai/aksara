import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Istilah *literasi kesehatan* membuktikan bahwa pilihan pertama tokoh sudah benar sebelum ia mengamati kebutuhan orang lain.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu membatasi *literasi kesehatan* pada perasaan tokoh sehingga tindakan dan akibat pilihannya tidak perlu diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Penyebutan *literasi kesehatan* menjadikan perubahan tokoh selesai seketika, padahal bacaan menunjukkan perkembangan bertahap.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *literasi kesehatan* menyatukan tiga tindakan Arum: memperoleh informasi dari petugas, memahaminya melalui kartu yang diperiksa, dan menggunakannya untuk membantu nenek.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut menunjukkan bahwa kemampuan membaca nomor meja sudah cukup untuk menggunakan semua informasi kesehatan.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
