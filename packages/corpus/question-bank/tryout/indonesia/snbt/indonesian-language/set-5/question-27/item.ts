import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam kelas reparasi pakaian.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam kelas reparasi pakaian memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: true,
          label:
            "Ayu memilih untuk memperbaiki jahitan dengan benang yang warnanya sengaja berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan kelas reparasi pakaian.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut konflik sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
