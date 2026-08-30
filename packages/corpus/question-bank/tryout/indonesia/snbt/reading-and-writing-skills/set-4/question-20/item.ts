import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team verglich 28, 18 und 20, begrenzte die Aussage auf den untersuchten Kontext (Büchertauschmarkt) und plante eine längere Wiederholung.",
        },
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalyse zur geprüften Änderung im Kontext „Büchertauschmarkt“",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte das Team Genre-Schilder auf jedem Tisch im folgenden Kontext: Büchertauschmarkt.",
        },
        {
          isCorrect: false,
          label:
            "die Folgestudie des Teams im untersuchten Kontext (Büchertauschmarkt)",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im untersuchten Kontext (Büchertauschmarkt) gaben kurze Rückmeldungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The team compared 28, 18, and 20, limited its claim to this setting (book exchange market), and planned a longer repetition.",
        },
        {
          isCorrect: false,
          label:
            "an analysis of the effectiveness of genre signs on each table in this setting (book exchange market)",
        },
        {
          isCorrect: false,
          label:
            "On Monday, the team tested genre signs on each table in this setting (book exchange market).",
        },
        {
          isCorrect: false,
          label:
            "the team's follow-up study of genre signs on each table in this setting (book exchange market)",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (book exchange market) provided brief comments.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim membandingkan 28, 18, dan 20, membatasi klaim pada pasar tukar buku, serta merencanakan pengulangan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "analisis efektivitas tanda genre di setiap meja di pasar tukar buku",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, tim menguji tanda genre di setiap meja di pasar tukar buku.",
        },
        {
          isCorrect: false,
          label:
            "kerja sama tim dalam uji tanda genre di setiap meja di pasar tukar buku",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna di pasar tukar buku memberikan komentar singkat.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
