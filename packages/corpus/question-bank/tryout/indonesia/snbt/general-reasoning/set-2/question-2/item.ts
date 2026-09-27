import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Semua penduduk Desa Nelayan membuat pakan ikan organik atau pakan ikan nonorganik",
        },
        {
          isCorrect: false,
          label:
            "Semua penduduk Desa Nelayan membuat pakan organik dan pakan nonorganik",
        },
        {
          isCorrect: false,
          label: "Semua penduduk Desa Nelayan tidak memiliki lahan budi daya",
        },
        {
          isCorrect: false,
          label: "Semua penduduk Desa Nelayan memiliki lahan budi daya",
        },
        {
          isCorrect: false,
          label:
            "Sebagian penduduk Desa Nelayan yang membudidaya ikan tidak memiliki pakan nonorganik",
        },
      ],
    },
  },
};

export default item;
