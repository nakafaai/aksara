import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Pelapor barang hilang memberikan komentar singkat.",
        },
        {
          correct: false,
          label:
            "Pelapor barang hilang memberikan komentar singkat yang tidak panjang.",
        },
        {
          correct: false,
          label:
            "Pelapor barang hilang memberikan komentar singkat sebagai pelapor yang melaporkan barang hilang.",
        },
        {
          correct: false,
          label:
            "Pelapor barang hilang memberikan komentar singkat dalam bentuk yang singkat.",
        },
        {
          correct: false,
          label:
            "Pelapor barang hilang memberikan komentar singkat, yaitu komentar yang pendek.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
