import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-inference",
  },
  stimulus: "itik",
  versions: {
    id: {
      columns: ["Dapat disimpulkan", "Tidak dapat disimpulkan"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Sepertiga dari petak yang disemprot pada musim itu adalah petak yang sejak awal musim dilepasi itik.",
        },
        {
          column: 2,
          label:
            "Petak-petak yang sejak awal musim dilepasi itik lebih jarang disemprot pada musim gadu 2025 daripada pada musim tanam sebelumnya.",
        },
        {
          column: 2,
          label:
            "Seandainya petak-petak yang itiknya ditarik tidak disemprot, rata-rata hasil panennya akan lebih rendah daripada $$4{,}5$$ ton gabah per hektare.",
        },
        {
          column: 1,
          label:
            "Rata-rata hasil panen petak yang sejak awal musim tidak dilepasi itik lebih tinggi daripada $$5{,}0$$ ton gabah per hektare.",
        },
      ],
    },
  },
};

export default item;
