import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Budi tidak menyelesaikan setiap sesi latihan yang dijadwalkan bulan ini.",
        },
        {
          isCorrect: false,
          label: "Budi tidak menyukai balap sepeda.",
        },
        {
          isCorrect: false,
          label: "Budi tidak akan pernah bisa menang balap sepeda.",
        },
        {
          isCorrect: false,
          label: "Budi sama sekali tidak berlatih sepeda bulan ini.",
        },
        {
          isCorrect: false,
          label: "Budi dilarang mengikuti semua balap sepeda jarak jauh.",
        },
      ],
    },
  },
};

export default item;
