import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Nutzenden Nutzenden im Kontext Fundbüroservice gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Alle sämtlichen Nutzenden im Kontext Fundbüroservice gaben Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Fundbüroservice gaben kurze knappe Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Fundbüroservice gaben erneut wieder Rückmeldungen.",
        },
        {
          isCorrect: true,
          label:
            "Die Nutzenden im untersuchten Kontext (Fundbüroservice) gaben kurze Rückmeldungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Users users in this setting (lost-property service) provided brief comments.",
        },
        {
          isCorrect: false,
          label:
            "All of every user in this setting (lost-property service) provided comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (lost-property service) provided brief short comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (lost-property service) provided comments again repeatedly.",
        },
        {
          isCorrect: true,
          label:
            "Users in this setting (lost-property service) provided brief comments.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Para pengguna-pengguna di layanan pencarian barang hilang memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Sejumlah para pengguna di layanan pencarian barang hilang memberikan komentar.",
        },
        {
          isCorrect: false,
          label:
            "Para semua pengguna di layanan pencarian barang hilang memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna di layanan pencarian barang hilang memberikan komentar singkat pendek.",
        },
        {
          isCorrect: true,
          label:
            "Para pengguna di layanan pencarian barang hilang memberikan komentar singkat.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
