import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalyse zur geprüften Änderung im Kontext „Fundbüroservice“",
        },
        {
          isCorrect: true,
          label:
            "Das Team verglich 29, 19 und 21, begrenzte die Aussage auf den untersuchten Kontext (Fundbüroservice) und plante eine längere Wiederholung.",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte das Team ein Formular mit strukturierten Ortsangaben im folgenden Kontext: Fundbüroservice.",
        },
        {
          isCorrect: false,
          label:
            "die Folgestudie des Teams im untersuchten Kontext (Fundbüroservice)",
        },
        {
          isCorrect: false,
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
            "an analysis of the effectiveness of a form with structured location choices in this setting (lost-property service)",
        },
        {
          isCorrect: true,
          label:
            "The team compared 29, 19, and 21, limited its claim to this setting (lost-property service), and planned a longer repetition.",
        },
        {
          isCorrect: false,
          label:
            "On Monday, the team tested a form with structured location choices in this setting (lost-property service).",
        },
        {
          isCorrect: false,
          label:
            "the team's follow-up study of a form with structured location choices in this setting (lost-property service)",
        },
        {
          isCorrect: false,
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
            "analisis efektivitas formulir dengan pilihan lokasi yang terstruktur di layanan pencarian barang hilang",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan 29, 19, dan 21, membatasi klaim pada layanan pencarian barang hilang, serta merencanakan pengulangan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, tim menguji formulir dengan pilihan lokasi yang terstruktur di layanan pencarian barang hilang.",
        },
        {
          isCorrect: false,
          label:
            "kerja sama tim dalam uji formulir dengan pilihan lokasi yang terstruktur di layanan pencarian barang hilang",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna di layanan pencarian barang hilang memberikan komentar singkat.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
