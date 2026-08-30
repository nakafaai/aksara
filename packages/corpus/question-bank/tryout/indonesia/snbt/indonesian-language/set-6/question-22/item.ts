import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam program teman belajar.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam program teman belajar memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan program teman belajar.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut penyangga belajar sebagai bukti bahwa uji tidak perlu diulang.",
        },
        {
          isCorrect: true,
          label:
            "Sari memilih untuk mengubah tujuan pertemuan dari mengejar bab menjadi memahami satu konsep.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
