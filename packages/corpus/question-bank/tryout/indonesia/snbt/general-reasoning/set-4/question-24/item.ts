import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "pelatihan",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Dari seluruh peserta yang mengikuti ujian di keempat kecamatan, kurang dari $$80\\%$$ yang lulus.",
        },
        {
          column: 2,
          label:
            "Dibandingkan dengan banyak peserta terdaftarnya, Kecamatan S meluluskan bagian peserta yang paling besar.",
        },
        {
          column: 2,
          label:
            "Kecamatan dengan persentase peserta memenuhi syarat kehadiran tertinggi juga memiliki persentase kelulusan tertinggi.",
        },
        {
          column: 1,
          label:
            "Kecamatan P meluluskan lebih dari $$60\\%$$ peserta terdaftarnya.",
        },
      ],
    },
  },
};

export default item;
