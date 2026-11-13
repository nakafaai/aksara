import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "concision",
  },
  stimulus: "kecapi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menurut catatan kelompok tani itu, bibit sambungan itu mulai berbunga pada tahun ketiga setelah ditanam, sedangkan pohon dari biji biasanya baru berbunga setelah tahun ketujuh.",
        },
        {
          correct: false,
          label:
            "Sebagian besar bibit sambungan itu mulai berbunga pada tahun ketiga setelah ditanam, sedangkan pohon dari biji biasanya baru berbunga setelah tahun ketujuh.",
        },
        {
          correct: false,
          label:
            "Menurut catatan kelompok tani itu, sebagian besar bibit sambungan itu mulai berbunga pada tahun ketiga setelah ditanam, sedangkan pohon dari biji baru berbunga setelah tahun ketujuh.",
        },
        {
          correct: false,
          label:
            "Menurut catatan kelompok tani itu, sebagian besar dari bibit-bibit sambungan itu sudah mulai berbunga pada tahun yang ketiga setelah ditanam, sedangkan pohon dari biji biasanya baru berbunga setelah tahun ketujuh.",
        },
        {
          correct: true,
          label:
            "Menurut catatan kelompok tani itu, sebagian besar bibit sambungan itu mulai berbunga pada tahun ketiga setelah ditanam, sedangkan pohon dari biji biasanya baru berbunga setelah tahun ketujuh.",
        },
      ],
    },
  },
};

export default item;
