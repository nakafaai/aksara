import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Nara memilih untuk menggambar lingkaran cahaya terakhir sebelum lampu padam.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam kampung pada malam hujan.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam kampung pada malam hujan memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan kampung pada malam hujan.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut akhir terbuka sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
