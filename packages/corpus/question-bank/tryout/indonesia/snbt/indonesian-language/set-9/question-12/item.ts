import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
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
            "Bacaan menyebut aksesibilitas sebagai bukti bahwa uji tidak perlu diulang.",
        },
        {
          isCorrect: true,
          label: "Kondisi pembanding menghasilkan nilai rata-rata 23.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
