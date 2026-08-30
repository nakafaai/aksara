import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam klinik kelurahan.",
        },
        {
          isCorrect: true,
          label:
            "Arum memilih untuk bertanya kepada petugas, lalu menggambar ulang alur dengan bahasa yang sederhana.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam klinik kelurahan memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan klinik kelurahan.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut literasi kesehatan sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
