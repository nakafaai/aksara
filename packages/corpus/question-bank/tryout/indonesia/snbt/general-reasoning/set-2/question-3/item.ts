import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Warga kehilangan motor",
        },
        {
          correct: false,
          label: "Warga resah dan gelisah",
        },
        {
          correct: true,
          label: "Petugas keamanan berpatroli secara rutin",
        },
        {
          correct: false,
          label: "Hampir setiap minggu terjadi pencurian di Gang Mawar",
        },
        {
          correct: false,
          label: "Petugas keamanan tidak berpatroli secara rutin",
        },
      ],
    },
  },
};

export default item;
