import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "categorical-syllogism",
  },
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Tidak ada kurir zona utara yang mengantar paket dengan berat di atas $$20$$ kg.",
        },
        {
          column: 1,
          label: "Sebagian pekerja sif malam memakai motor listrik.",
        },
        {
          column: 2,
          label: "Semua pemakai motor listrik adalah kurir zona utara.",
        },
        {
          column: 2,
          label:
            "Sebagian kurir yang bekerja pada sif malam mengantar paket dengan berat di atas $$20$$ kg.",
        },
      ],
    },
  },
};

export default item;
