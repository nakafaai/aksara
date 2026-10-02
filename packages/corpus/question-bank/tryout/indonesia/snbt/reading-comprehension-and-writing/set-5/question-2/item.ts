import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "ditambah secara bertahap selama sesi uji",
        },
        {
          isCorrect: false,
          label: "dicatat setelah hasil uji diketahui",
        },
        {
          isCorrect: false,
          label: "diganti hanya pada kondisi pembanding",
        },
        {
          isCorrect: false,
          label: "diabaikan karena tidak berkaitan dengan hasil",
        },
        {
          isCorrect: true,
          label:
            "dijaga tetap sama agar pengaruh perubahan lebih mudah ditafsirkan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
