import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam bangunan tua yang sedang dipugar.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam bangunan tua yang sedang dipugar memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: true,
          label:
            "Galih memilih untuk mengikuti garis retak di dinding dan menemukan bekas warna dari ruangan lama.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan bangunan tua yang sedang dipugar.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut foreshadowing sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
