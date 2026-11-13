import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "quantifiers",
  },
  versions: {
    id: {
      columns: ["Pasti benar", "Tidak pasti benar"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Sebagian pengurus OSIS tidak lolos babak penyisihan olimpiade.",
        },
        {
          column: 2,
          label:
            "Tidak ada penerima kaus panitia yang mengikuti lomba debat.",
        },
        {
          column: 2,
          label:
            "Semua pengurus OSIS yang lolos babak penyisihan olimpiade menerima kaus panitia.",
        },
        {
          column: 1,
          label: "Sebagian peserta pelatihan intensif adalah pengurus OSIS.",
        },
      ],
    },
  },
};

export default item;
