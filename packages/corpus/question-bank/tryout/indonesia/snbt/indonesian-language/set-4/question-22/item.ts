import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam pasar kecamatan.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam pasar kecamatan memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan pasar kecamatan.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut advokasi diri sebagai bukti bahwa uji tidak perlu diulang.",
        },
        {
          isCorrect: true,
          label:
            "Nisa memilih untuk mencatat rute yang sulit dan mengusulkan tanda yang bisa dibaca dari kursi roda.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
