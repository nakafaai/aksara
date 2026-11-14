import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "concision",
  },
  stimulus: "resapan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Menurut catatan stasiun cuaca terdekat, curah hujan pada musim hujan itu hampir sama dengan curah hujan pada musim hujan tahun sebelumnya.",
        },
        {
          correct: false,
          label:
            "Menurut catatan stasiun cuaca terdekat, curah hujan pada musim hujan itu hampir sama dengan curah hujan pada musim sebelumnya.",
        },
        {
          correct: false,
          label:
            "Menurut catatan stasiun cuaca terdekat, curah hujan pada musim hujan itu sama dengan curah hujan pada musim hujan tahun sebelumnya.",
        },
        {
          correct: false,
          label:
            "Menurut catatan stasiun cuaca terdekat, jumlah curah hujan pada musim hujan itu hampir sama dengan jumlah curah hujan pada musim hujan tahun sebelumnya.",
        },
        {
          correct: false,
          label:
            "Menurut catatan stasiun cuaca, curah hujan pada musim hujan itu hampir sama dengan curah hujan pada musim hujan tahun sebelumnya.",
        },
      ],
    },
  },
};

export default item;
