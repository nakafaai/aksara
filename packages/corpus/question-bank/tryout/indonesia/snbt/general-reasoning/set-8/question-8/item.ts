import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Paket M dikirim ke penyimpanan berpendingin.",
        },
        {
          correct: false,
          label: "Paket berlabel merah dikirim ke pemeriksaan manual.",
        },
        {
          correct: false,
          label: "Paket M tidak dikirim ke pemeriksaan manual.",
        },
        {
          correct: false,
          label: "Tidak ada paket yang dikirim ke kedua jalur.",
        },
        {
          correct: true,
          label:
            "Paket M dikirim ke pemeriksaan manual karena memiliki label biru.",
        },
      ],
    },
  },
};

export default item;
