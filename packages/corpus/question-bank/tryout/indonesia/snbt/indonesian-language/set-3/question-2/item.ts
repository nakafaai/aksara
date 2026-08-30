import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam perkecambahan kacang hijau.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam perkecambahan kacang hijau memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan perkecambahan kacang hijau.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut variabel kontrol sebagai bukti bahwa uji tidak perlu diulang.",
        },
        {
          isCorrect: true,
          label: "Pada kondisi dengan perubahan, hasil rata-rata tercatat 18.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
