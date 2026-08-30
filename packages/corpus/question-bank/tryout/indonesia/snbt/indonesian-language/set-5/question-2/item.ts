import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam model penyaringan air keruh.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam model penyaringan air keruh memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: true,
          label: "Pada kondisi dengan perubahan, hasil rata-rata tercatat 68.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan model penyaringan air keruh.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut indikator sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
