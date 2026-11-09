import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "grid-logic",
  },
  stimulus: "lantai",
  versions: {
    id: {
      columns: ["Mungkin", "Tidak mungkin"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Tika tinggal di lantai 4 dan hobi memasak.",
        },
        {
          column: 1,
          label: "Sita tinggal di lantai 3 dan hobi melukis.",
        },
        {
          column: 2,
          label: "Rani tinggal di lantai 2.",
        },
        {
          column: 1,
          label: "Rani tinggal di lantai 3 dan hobi memasak.",
        },
      ],
    },
  },
};

export default item;
