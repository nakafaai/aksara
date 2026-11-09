import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "kunang",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Cahaya kunang-kunang hampir tidak menghasilkan panas.",
        },
        {
          column: 2,
          label: "Semua jenis kunang-kunang memiliki pola kedipan yang sama.",
        },
        {
          column: 1,
          label:
            "Mengurangi lampu yang menyala di dekat sawah pada malam hari dapat membantu kunang-kunang menemukan pasangan.",
        },
        {
          column: 2,
          label: "Kunang-kunang dewasa bertelur di dalam air sungai.",
        },
      ],
    },
  },
};

export default item;
