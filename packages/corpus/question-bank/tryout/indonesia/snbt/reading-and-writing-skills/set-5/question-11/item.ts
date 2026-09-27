import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "analisa efektivitas daftar pemeriksaan sebelum merekam",
        },
        {
          isCorrect: false,
          label: "analisis efektifitas daftar pemeriksaan sebelum merekam",
        },
        {
          isCorrect: true,
          label: "analisis efektivitas daftar pemeriksaan sebelum merekam",
        },
        {
          isCorrect: false,
          label: "analisa efektifitas daftar pemeriksaan sebelum merekam",
        },
        {
          isCorrect: false,
          label:
            "analisis efektivitas daftar pemeriksaan dalam kontek perekaman",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
