import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam pameran sains keliling.",
        },
        {
          isCorrect: true,
          label:
            "Lila memilih untuk menuliskan satu pertanyaan pada kartu kosong dan menempelkannya di alat yang paling sunyi.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam pameran sains keliling memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan pameran sains keliling.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut atmosfer sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
