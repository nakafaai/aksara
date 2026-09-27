import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Paket M dikirim ke penyimpanan berpendingin.",
        },
        {
          isCorrect: false,
          label: "Paket berlabel merah dikirim ke pemeriksaan manual.",
        },
        {
          isCorrect: false,
          label: "Paket M tidak dikirim ke pemeriksaan manual.",
        },
        {
          isCorrect: false,
          label: "Tidak ada paket yang dikirim ke kedua jalur.",
        },
        {
          isCorrect: true,
          label:
            "Paket M dikirim ke pemeriksaan manual karena memiliki label biru.",
        },
      ],
    },
  },
};

export default item;
