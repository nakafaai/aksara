import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalyse zur geprüften Änderung im Kontext „Aufnahmestudio der Schule“",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte das Team eine Checkliste vor der Aufnahme im folgenden Kontext: Aufnahmestudio der Schule.",
        },
        {
          isCorrect: false,
          label:
            "die Folgestudie des Teams im untersuchten Kontext (Aufnahmestudio der Schule)",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im untersuchten Kontext (Aufnahmestudio der Schule) gaben kurze Rückmeldungen.",
        },
        {
          isCorrect: true,
          label:
            "Das Team verglich 28, 20 und 22, begrenzte die Aussage auf den untersuchten Kontext (Aufnahmestudio der Schule) und plante eine längere Wiederholung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "an analysis of the effectiveness of a checklist used before recording in this setting (school recording studio)",
        },
        {
          isCorrect: false,
          label:
            "On Monday, the team tested a checklist used before recording in this setting (school recording studio).",
        },
        {
          isCorrect: false,
          label:
            "the team's follow-up study of a checklist used before recording in this setting (school recording studio)",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (school recording studio) provided brief comments.",
        },
        {
          isCorrect: true,
          label:
            "The team compared 28, 20, and 22, limited its claim to this setting (school recording studio), and planned a longer repetition.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "analisis efektivitas daftar pemeriksaan sebelum merekam di studio rekaman sekolah",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, tim menguji daftar pemeriksaan sebelum merekam di studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "kerja sama tim dalam uji daftar pemeriksaan sebelum merekam di studio rekaman sekolah",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna di studio rekaman sekolah memberikan komentar singkat.",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan 28, 20, dan 22, membatasi klaim pada studio rekaman sekolah, serta merencanakan pengulangan yang lebih panjang.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
