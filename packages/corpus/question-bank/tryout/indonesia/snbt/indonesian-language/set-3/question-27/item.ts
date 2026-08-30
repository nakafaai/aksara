import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam terminal saat hujan sore.",
        },
        {
          isCorrect: true,
          label:
            "Mira memilih untuk menaruh satu buku cerita di kursi kosong dan membacakan halaman pertama.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam terminal saat hujan sore memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan terminal saat hujan sore.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut simbol sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
