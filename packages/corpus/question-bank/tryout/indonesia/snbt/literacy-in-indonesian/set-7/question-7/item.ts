import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "interpretation",
  },
  stimulus: "tide-poem",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Keluarga aku dahulu mengatur kegiatan sehari-hari menurut waktu pasang dan surut.",
        },
        {
          column: 2,
          label:
            "Ayah berhenti melaut karena laut di kampungnya tidak lagi mengalami pasang.",
        },
        {
          column: 2,
          label:
            "Aku memakai jam di ponselnya untuk mengetahui kapan pasang datang di kotanya.",
        },
        {
          column: 2,
          label: "Ayah biasanya berangkat melaut ketika air mulai surut.",
        },
      ],
    },
  },
};

export default item;
