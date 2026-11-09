import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Tekun mengembangkan kemampuan aktingnya",
        },
        {
          correct: false,
          label: "Mudah menerima citra yang ditentukan orang lain",
        },
        {
          correct: false,
          label: "Berani meninggalkan dunia perfilman",
        },
        {
          correct: false,
          label: "Mengutamakan ketenaran daripada keterampilan",
        },
        {
          correct: false,
          label: "Tidak puas terhadap penghargaan yang diterimanya",
        },
      ],
    },
  },
};

export default item;
