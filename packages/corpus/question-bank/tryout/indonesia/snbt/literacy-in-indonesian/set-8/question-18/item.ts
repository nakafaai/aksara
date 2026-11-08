import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-comparison",
  },
  stimulus: "nickel-processing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "ekspor bijih nikel mentah sebaiknya dibuka kembali",
        },
        {
          correct: true,
          label: "pengolahan nikel di dalam negeri perlu dilanjutkan",
        },
        {
          correct: false,
          label: "pembangkit batu bara untuk smelter harus segera ditutup",
        },
        {
          correct: false,
          label: "larangan ekspor perlu diterapkan pada semua bahan tambang",
        },
        {
          correct: false,
          label:
            "daerah penghasil nikel mungkin tidak memerlukan bagian manfaat",
        },
      ],
    },
  },
};

export default item;
