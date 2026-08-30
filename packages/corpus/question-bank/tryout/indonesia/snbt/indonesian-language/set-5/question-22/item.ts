import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam gudang kecil dekat pelabuhan.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam gudang kecil dekat pelabuhan memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan gudang kecil dekat pelabuhan.",
        },
        {
          isCorrect: true,
          label:
            "Bima memilih untuk membagi tugas berdasarkan waktu luang dan mencatat alasan setiap perubahan.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut akuntabilitas sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
