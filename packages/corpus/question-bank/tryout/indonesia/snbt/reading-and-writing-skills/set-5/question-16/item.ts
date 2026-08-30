import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Nutzenden im untersuchten Kontext (Aufnahmestudio der Schule) gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden Nutzenden im Kontext Aufnahmestudio der Schule gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Alle sämtlichen Nutzenden im Kontext Aufnahmestudio der Schule gaben Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Aufnahmestudio der Schule gaben kurze knappe Rückmeldungen.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im Kontext Aufnahmestudio der Schule gaben erneut wieder Rückmeldungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Users in this setting (school recording studio) provided brief comments.",
        },
        {
          isCorrect: false,
          label:
            "Users users in this setting (school recording studio) provided brief comments.",
        },
        {
          isCorrect: false,
          label:
            "All of every user in this setting (school recording studio) provided comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (school recording studio) provided brief short comments.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (school recording studio) provided comments again repeatedly.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Para pengguna di studio rekaman sekolah memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna-pengguna di studio rekaman sekolah memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Sejumlah para pengguna di studio rekaman sekolah memberikan komentar.",
        },
        {
          isCorrect: false,
          label:
            "Para semua pengguna di studio rekaman sekolah memberikan komentar singkat.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna di studio rekaman sekolah memberikan komentar singkat pendek.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
