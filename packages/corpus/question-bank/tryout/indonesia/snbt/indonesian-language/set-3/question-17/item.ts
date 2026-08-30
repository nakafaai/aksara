import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam panggung baca di terminal.",
        },
        {
          isCorrect: true,
          label:
            "Kedua sumber sama-sama menunjukkan bahwa keduanya menunjukkan bahwa kegiatan baca hadir di ruang tunggu.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam panggung baca di terminal memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan panggung baca di terminal.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut sumber sezaman sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
