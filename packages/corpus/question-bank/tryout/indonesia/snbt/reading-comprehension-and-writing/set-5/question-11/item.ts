import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "analisa efektivitas daftar pemeriksaan sebelum merekam",
        },
        {
          correct: false,
          label: "analisis efektifitas daftar pemeriksaan sebelum merekam",
        },
        {
          correct: true,
          label: "analisis efektivitas daftar pemeriksaan sebelum merekam",
        },
        {
          correct: false,
          label: "analisa efektifitas daftar pemeriksaan sebelum merekam",
        },
        {
          correct: false,
          label:
            "analisis efektivitas daftar pemeriksaan dalam kontek perekaman",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
