import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Laras memilih untuk memilih jalur pendek, menyimpan ponsel, dan mencatat tiga suara yang ia dengar.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam jalur wisata hutan kota.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam jalur wisata hutan kota memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan jalur wisata hutan kota.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut kesadaran penuh sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
