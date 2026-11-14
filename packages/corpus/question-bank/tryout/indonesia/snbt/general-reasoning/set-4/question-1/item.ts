import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "conclusion",
  },
  stimulus: "itik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Di antara petak yang sejak awal musim dilepasi itik, bagian petak yang harus disemprot adalah separuh dari bagian itu di antara petak yang sejak awal tidak dilepasi itik.",
        },
        {
          correct: false,
          label:
            "Tidak satu pun petak yang pernah dilepasi itik harus disemprot, sedangkan separuh petak yang tidak dilepasi itik harus disemprot.",
        },
        {
          correct: false,
          label:
            "Di antara petak yang sejak awal musim dilepasi itik, bagian petak yang harus disemprot adalah sepertiga dari bagian itu di antara petak yang sejak awal tidak dilepasi itik.",
        },
        {
          correct: false,
          label:
            "Rata-rata hasil panen petak yang sejak awal musim dilepasi itik $$1$$ ton per hektare lebih tinggi daripada rata-rata hasil panen petak yang sejak awal tidak dilepasi itik.",
        },
        {
          correct: false,
          label:
            "Jika semua $$40$$ petak dilepasi itik sejak awal musim, hanya $$8$$ petak yang harus disemprot.",
        },
      ],
    },
  },
};

export default item;
