import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam tur bangunan bersejarah.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam tur bangunan bersejarah memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan tur bangunan bersejarah.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut triangulasi sebagai bukti bahwa uji tidak perlu diulang.",
        },
        {
          isCorrect: true,
          label:
            "Kedua sumber sama-sama menunjukkan bahwa keduanya membantu menjelaskan fungsi bangunan pada masa berbeda.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
