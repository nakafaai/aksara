import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Am Montag prüfte das Team eine Checkliste vor der Aufnahme im folgenden Kontext: Aufnahmestudio der Schule.",
        },
        {
          isCorrect: false,
          label:
            "am Montag prüfte das Team eine Checkliste vor der Aufnahme im Kontext Aufnahmestudio der Schule.",
        },
        {
          isCorrect: false,
          label:
            "Am montag prüfte das Team eine Checkliste vor der Aufnahme im Kontext Aufnahmestudio der Schule.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte Das Team eine Checkliste vor der Aufnahme im Kontext Aufnahmestudio der Schule.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag, prüfte das Team eine Checkliste vor der Aufnahme im Kontext Aufnahmestudio der Schule",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "On Monday, the team tested a checklist used before recording in this setting (school recording studio).",
        },
        {
          isCorrect: false,
          label:
            "on Monday, the team tested a checklist used before recording in this setting (school recording studio).",
        },
        {
          isCorrect: false,
          label:
            "On monday, the team tested a checklist used before recording in this setting (school recording studio).",
        },
        {
          isCorrect: false,
          label:
            "On Monday, The team tested a checklist used before recording in this setting (school recording studio).",
        },
        {
          isCorrect: false,
          label:
            "On Monday the team tested a checklist used before recording in this setting (school recording studio)",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji daftar pemeriksaan sebelum merekam di studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji daftar pemeriksaan sebelum merekam di studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji daftar pemeriksaan sebelum merekam di studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji daftar pemeriksaan sebelum merekam di studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji daftar pemeriksaan sebelum merekam di studio rekaman sekolah",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
