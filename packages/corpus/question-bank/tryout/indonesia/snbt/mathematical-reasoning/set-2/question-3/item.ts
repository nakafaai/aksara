import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "game-energy",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jika Nadia memulai misi bos pukul 10.00 dan tidak meminum ramuan, energinya pertama kali mencapai $$60$$ pada pukul 12.15.",
        },
        {
          column: 2,
          label:
            "Jika Nadia tidak meminum ramuan, energinya pada pukul 12.30 selalu sama, kapan pun ia memulai misi bos.",
        },
        {
          column: 1,
          label:
            "Nadia dapat mengatur waktu misi bos dan waktu minum ramuan sehingga energinya pada pukul 12.30 lebih dari $$85$$.",
        },
        {
          column: 1,
          label:
            "Jika Nadia meminum ramuan tepat pukul 10.00, energinya pada pukul 12.30 pasti tidak lebih dari $$75$$.",
        },
      ],
    },
  },
};

export default item;
