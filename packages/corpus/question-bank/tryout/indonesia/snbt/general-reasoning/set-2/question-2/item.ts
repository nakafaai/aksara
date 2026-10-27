import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Semua penduduk Desa Nelayan membuat pakan ikan organik atau pakan ikan nonorganik",
        },
        {
          correct: false,
          label:
            "Semua penduduk Desa Nelayan membuat pakan organik dan pakan nonorganik",
        },
        {
          correct: false,
          label: "Semua penduduk Desa Nelayan tidak memiliki lahan budi daya",
        },
        {
          correct: false,
          label: "Semua penduduk Desa Nelayan memiliki lahan budi daya",
        },
        {
          correct: false,
          label:
            "Sebagian penduduk Desa Nelayan yang membudidaya ikan tidak memiliki pakan nonorganik",
        },
      ],
    },
  },
};

export default item;
