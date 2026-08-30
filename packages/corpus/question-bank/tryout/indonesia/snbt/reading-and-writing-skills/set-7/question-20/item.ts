import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalyse zur geprüften Änderung im Kontext „Schirmverleih am Bahnhof“",
        },
        {
          isCorrect: true,
          label:
            "Das Team verglich 32, 24 und 26, begrenzte die Aussage auf den untersuchten Kontext (Schirmverleih am Bahnhof) und plante eine längere Wiederholung.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte das Team einen Rückgabecode an jedem Griff im folgenden Kontext: Schirmverleih am Bahnhof.",
        },
        {
          isCorrect: false,
          label:
            "die Folgestudie des Teams im untersuchten Kontext (Schirmverleih am Bahnhof)",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im untersuchten Kontext (Schirmverleih am Bahnhof) gaben kurze Rückmeldungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "an analysis of the effectiveness of a return code on each handle in this setting (station umbrella lending)",
        },
        {
          isCorrect: true,
          label:
            "The team compared 32, 24, and 26, limited its claim to this setting (station umbrella lending), and planned a longer repetition.",
        },
        {
          isCorrect: false,
          label:
            "On Monday, the team tested a return code on each handle in this setting (station umbrella lending).",
        },
        {
          isCorrect: false,
          label:
            "the team's follow-up study of a return code on each handle in this setting (station umbrella lending)",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (station umbrella lending) provided brief comments.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "analisis efektivitas kode pengembalian di peminjaman payung stasiun",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan 32, 24, dan 26, membatasi klaim pada peminjaman payung stasiun, serta merencanakan pengulangan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, tim menguji kode pengembalian di peminjaman payung stasiun.",
        },
        {
          isCorrect: false,
          label:
            "kerja sama tim dalam uji kode pengembalian di peminjaman payung stasiun",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna di peminjaman payung stasiun memberikan komentar singkat.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
