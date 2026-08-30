import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam taman bermain inklusif.",
        },
        {
          isCorrect: true,
          label:
            "Tari memilih untuk mengamati kebutuhan tiga anak sebelum memilih permainan kelompok.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam taman bermain inklusif memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan taman bermain inklusif.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut empati sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
