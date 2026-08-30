import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalyse zur geprüften Änderung im Kontext „Musikproberäume“",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte das Team einen nach Absagen aktualisierten digitalen Plan im folgenden Kontext: Musikproberäume.",
        },
        {
          isCorrect: false,
          label:
            "die Folgestudie des Teams im untersuchten Kontext (Musikproberäume)",
        },
        {
          isCorrect: true,
          label:
            "Das Team verglich 29, 21 und 23, begrenzte die Aussage auf den untersuchten Kontext (Musikproberäume) und plante eine längere Wiederholung.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im untersuchten Kontext (Musikproberäume) gaben kurze Rückmeldungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "an analysis of the effectiveness of a digital schedule updated after cancellations in this setting (music practice rooms)",
        },
        {
          isCorrect: false,
          label:
            "On Monday, the team tested a digital schedule updated after cancellations in this setting (music practice rooms).",
        },
        {
          isCorrect: false,
          label:
            "the team's follow-up study of a digital schedule updated after cancellations in this setting (music practice rooms)",
        },
        {
          isCorrect: true,
          label:
            "The team compared 29, 21, and 23, limited its claim to this setting (music practice rooms), and planned a longer repetition.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (music practice rooms) provided brief comments.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "analisis efektivitas jadwal digital yang diperbarui setelah pembatalan di ruang latihan musik",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, tim menguji jadwal digital yang diperbarui setelah pembatalan di ruang latihan musik.",
        },
        {
          isCorrect: false,
          label:
            "kerja sama tim dalam uji jadwal digital yang diperbarui setelah pembatalan di ruang latihan musik",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan 29, 21, dan 23, membatasi klaim pada ruang latihan musik, serta merencanakan pengulangan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna di ruang latihan musik memberikan komentar singkat.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
