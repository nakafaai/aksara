import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam antrean pemeriksaan kesehatan.",
        },
        {
          isCorrect: true,
          label: "Kondisi pembanding menghasilkan nilai rata-rata 42.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam antrean pemeriksaan kesehatan memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan antrean pemeriksaan kesehatan.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut alur layanan sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
