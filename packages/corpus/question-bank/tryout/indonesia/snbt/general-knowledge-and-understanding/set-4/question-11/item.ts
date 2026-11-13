import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "pusaka",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Dalam perkawinan yang mengikuti adat Minangkabau, seorang anak tidak pernah sesuku dengan ayahnya.",
        },
        {
          column: 2,
          label:
            "Seorang laki-laki Minangkabau kini dapat mewariskan gelar penghulunya kepada anak laki-lakinya sendiri.",
        },
        {
          column: 2,
          label:
            "Rumah yang dibangun sepasang suami istri dari hasil usaha mereka sendiri termasuk harta pusaka tinggi.",
        },
        {
          column: 1,
          label:
            "Seorang laki-laki Minangkabau dapat ikut mengawasi harta yang kelak tidak akan beralih kepada anak-anaknya.",
        },
      ],
    },
  },
};

export default item;
