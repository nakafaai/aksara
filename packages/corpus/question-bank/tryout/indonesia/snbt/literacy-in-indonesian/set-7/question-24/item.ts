import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Istilah *literasi kesehatan* membuktikan bahwa pilihan pertama tokoh sudah benar sebelum ia mengamati kebutuhan orang lain.",
        },
        {
          correct: false,
          label:
            "Definisi itu membatasi *literasi kesehatan* pada perasaan tokoh sehingga tindakan dan akibat pilihannya tidak perlu diperiksa.",
        },
        {
          correct: false,
          label:
            "Penyebutan *literasi kesehatan* menjadikan perubahan tokoh selesai seketika, padahal bacaan menunjukkan perkembangan bertahap.",
        },
        {
          correct: true,
          label:
            "Definisi *literasi kesehatan* menyatukan tiga tindakan Arum: memperoleh informasi dari petugas, memahaminya melalui kartu yang diperiksa, dan menggunakannya untuk membantu nenek.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut menunjukkan bahwa kemampuan membaca nomor meja sudah cukup untuk menggunakan semua informasi kesehatan.",
        },
      ],
    },
  },
  stimulus: "passage-5",
};

export default item;
