import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kerjasama tim dalam uji contoh pencatatan waktu",
        },
        {
          isCorrect: false,
          label: "kerja-sama tim dalam uji contoh pencatatan waktu",
        },
        {
          isCorrect: false,
          label: "kerja samah tim dalam uji contoh pencatatan waktu",
        },
        {
          isCorrect: true,
          label: "kerja sama tim dalam uji contoh pencatatan waktu",
        },
        {
          isCorrect: false,
          label: "kerja sama-sama tim dalam uji contoh pencatatan waktu",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
