import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "battery-drain",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jika ponsel diisi daya sambil dipakai menonton video sejak baterainya di bawah $$80\\%$$, baterainya tidak akan pernah melebihi $$80\\%$$.",
        },
        {
          column: 1,
          label:
            "Dari baterai $$100\\%$$, bermain gim terus-menerus tanpa diisi daya membuat ponsel mati tepat $$4$$ jam kemudian.",
        },
        {
          column: 2,
          label:
            "Dari baterai $$50\\%$$, mengisi daya selama $$1$$ jam tanpa memakai ponsel membuat baterai menjadi $$86\\%$$.",
        },
        {
          column: 1,
          label:
            "Dari baterai $$50\\%$$, membaca selama $$3$$ jam lalu menonton video selama $$1$$ jam menghasilkan baterai akhir yang sama dengan menonton video selama $$1$$ jam lalu membaca selama $$3$$ jam.",
        },
      ],
    },
  },
};

export default item;
