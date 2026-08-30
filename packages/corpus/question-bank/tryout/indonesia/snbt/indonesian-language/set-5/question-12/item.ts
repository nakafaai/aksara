import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam pengiriman buku antarpulau.",
        },
        {
          isCorrect: true,
          label: "Kondisi pembanding menghasilkan nilai rata-rata 32.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam pengiriman buku antarpulau memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan pengiriman buku antarpulau.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut logistik sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
