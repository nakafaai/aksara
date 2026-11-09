import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "idiom",
  },
  stimulus: "rempah",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Dipindahkan dengan tangan dari satu kapal ke kapal lain",
        },
        {
          correct: false,
          label: "Disimpan lama di dalam gudang pelabuhan",
        },
        {
          correct: true,
          label: "Beralih dari satu pemilik atau pedagang ke pemilik lain",
        },
        {
          correct: false,
          label: "Dicuri oleh bajak laut di tengah perjalanan",
        },
        {
          correct: false,
          label: "Ditimbang ulang oleh petugas pelabuhan",
        },
      ],
    },
  },
};

export default item;
