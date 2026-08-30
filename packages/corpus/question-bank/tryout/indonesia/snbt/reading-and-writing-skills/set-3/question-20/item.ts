import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalyse zur geprüften Änderung im Kontext „Kompostierworkshop“",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte das Team Karten zur Reihenfolge brauner und grüner Materialien im folgenden Kontext: Kompostierworkshop.",
        },
        {
          isCorrect: false,
          label:
            "die Folgestudie des Teams im untersuchten Kontext (Kompostierworkshop)",
        },
        {
          isCorrect: true,
          label:
            "Das Team verglich 31, 23 und 25, begrenzte die Aussage auf den untersuchten Kontext (Kompostierworkshop) und plante eine längere Wiederholung.",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im untersuchten Kontext (Kompostierworkshop) gaben kurze Rückmeldungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "an analysis of the effectiveness of cards showing the order of brown and green materials in this setting (composting workshop)",
        },
        {
          isCorrect: false,
          label:
            "On Monday, the team tested cards showing the order of brown and green materials in this setting (composting workshop).",
        },
        {
          isCorrect: false,
          label:
            "the team's follow-up study of cards showing the order of brown and green materials in this setting (composting workshop)",
        },
        {
          isCorrect: true,
          label:
            "The team compared 31, 23, and 25, limited its claim to this setting (composting workshop), and planned a longer repetition.",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (composting workshop) provided brief comments.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "analisis efektivitas kartu urutan bahan cokelat dan hijau di lokakarya pembuatan kompos",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, tim menguji kartu urutan bahan cokelat dan hijau di lokakarya pembuatan kompos.",
        },
        {
          isCorrect: false,
          label:
            "kerja sama tim dalam uji kartu urutan bahan cokelat dan hijau di lokakarya pembuatan kompos",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan 31, 23, dan 25, membatasi klaim pada lokakarya pembuatan kompos, serta merencanakan pengulangan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna di lokakarya pembuatan kompos memberikan komentar singkat.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
