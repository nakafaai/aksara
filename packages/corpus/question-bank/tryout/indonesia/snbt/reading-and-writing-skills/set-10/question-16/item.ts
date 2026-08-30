import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Nutzenden Nutzenden im Kontext Informationsstelle im Stadtpark gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: true,
          label:
            "Die Nutzenden im untersuchten Kontext (Informationsstelle im Stadtpark) gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Alle sämtlichen Nutzenden im Kontext Informationsstelle im Stadtpark gaben Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Informationsstelle im Stadtpark gaben kurze knappe Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Informationsstelle im Stadtpark gaben erneut wieder Rückmeldungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Users users in this setting (city park information desk) provided brief comments.",
        },
        {
          isCorrect: true,
          label:
            "Users in this setting (city park information desk) provided brief comments.",
        },
        {
          isCorrect: false,
          label:
            "All of every user in this setting (city park information desk) provided comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (city park information desk) provided brief short comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (city park information desk) provided comments again repeatedly.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Para pengguna-pengguna di pusat informasi taman kota memberikan komentar singkat.",
        },
        {
          isCorrect: true,
          label:
            "Para pengguna di pusat informasi taman kota memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Sejumlah para pengguna di pusat informasi taman kota memberikan komentar.",
        },
        {
          isCorrect: false,
          label:
            "Para semua pengguna di pusat informasi taman kota memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna di pusat informasi taman kota memberikan komentar singkat pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
