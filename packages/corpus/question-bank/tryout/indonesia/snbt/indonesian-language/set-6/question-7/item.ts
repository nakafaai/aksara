import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Siswa menggunakan model untuk mengulang langkah dan memeriksa hubungan antarbagiannya.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam model erosi menggunakan baki tanah.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam model erosi menggunakan baki tanah memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan model erosi menggunakan baki tanah.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut erosi sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
