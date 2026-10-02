import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "analisa efektivitas contoh pencatatan waktu suara",
        },
        {
          isCorrect: false,
          label: "analisis efektifitas contoh pencatatan waktu suara",
        },
        {
          isCorrect: true,
          label: "analisis efektivitas contoh pencatatan waktu suara",
        },
        {
          isCorrect: false,
          label: "analisa efektifitas contoh pencatatan waktu suara",
        },
        {
          isCorrect: false,
          label:
            "analisis efektivitas contoh pencatatan dalam kontek kebisingan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
