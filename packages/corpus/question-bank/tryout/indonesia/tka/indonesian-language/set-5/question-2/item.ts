import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  stimulus: "clinic-queue",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "dilakukan langsung di loket dengan bantuan petugas, tanpa aplikasi",
        },
        {
          correct: false,
          label: "buku petunjuk yang menjelaskan cara memakai aplikasi antrean",
        },
        {
          correct: false,
          label: "dilakukan secara otomatis tanpa bantuan petugas",
        },
        {
          correct: false,
          label: "khusus diperuntukkan bagi pasien yang lupa membawa kartu",
        },
        {
          correct: false,
          label: "dilakukan pada pagi hari sebelum puskesmas dibuka",
        },
      ],
    },
  },
};

export default item;
