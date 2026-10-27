import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Budi tidak menyelesaikan setiap sesi latihan yang dijadwalkan bulan ini.",
        },
        {
          correct: false,
          label: "Budi tidak menyukai balap sepeda.",
        },
        {
          correct: false,
          label: "Budi tidak akan pernah bisa menang balap sepeda.",
        },
        {
          correct: false,
          label: "Budi sama sekali tidak berlatih sepeda bulan ini.",
        },
        {
          correct: false,
          label: "Budi dilarang mengikuti semua balap sepeda jarak jauh.",
        },
      ],
    },
  },
};

export default item;
