import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "nilai",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Paling sedikit $$8$$ siswa kelas A mendapat nilai $$82$$ atau lebih.",
        },
        {
          correct: false,
          label: "Tepat $$13$$ siswa kelas B mendapat nilai lebih dari $$68$$.",
        },
        {
          correct: true,
          label: "Lebih dari $$25\\%$$ siswa kelas B mendapat nilai $$76$$ atau lebih.",
        },
        {
          correct: true,
          label:
            "Banyak siswa kelas A yang nilainya lebih dari $$76$$ lebih besar daripada banyak siswa kelas B yang nilainya lebih dari $$76$$.",
        },
        {
          correct: true,
          label:
            "Paling sedikit $$17$$ siswa kelas A mendapat nilai dari $$56$$ sampai dengan $$82$$.",
        },
      ],
    },
  },
};

export default item;
