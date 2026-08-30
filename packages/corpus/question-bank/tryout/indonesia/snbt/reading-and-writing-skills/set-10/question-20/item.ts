import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team verglich 33, 23 und 25, begrenzte die Aussage auf den untersuchten Kontext (Informationsstelle im Stadtpark) und plante eine längere Wiederholung.",
        },
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalyse zur geprüften Änderung im Kontext „Informationsstelle im Stadtpark“",
        },
        {
          isCorrect: false,
          label:
            "Am Montag prüfte das Team kleine Karten mit Gehzeiten im folgenden Kontext: Informationsstelle im Stadtpark.",
        },
        {
          isCorrect: false,
          label:
            "die Folgestudie des Teams im untersuchten Kontext (Informationsstelle im Stadtpark)",
        },
        {
          isCorrect: false,
          label:
            "Die Nutzenden im untersuchten Kontext (Informationsstelle im Stadtpark) gaben kurze Rückmeldungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The team compared 33, 23, and 25, limited its claim to this setting (city park information desk), and planned a longer repetition.",
        },
        {
          isCorrect: false,
          label:
            "an analysis of the effectiveness of small maps showing walking times in this setting (city park information desk)",
        },
        {
          isCorrect: false,
          label:
            "On Monday, the team tested small maps showing walking times in this setting (city park information desk).",
        },
        {
          isCorrect: false,
          label:
            "the team's follow-up study of small maps showing walking times in this setting (city park information desk)",
        },
        {
          isCorrect: false,
          label:
            "Users in this setting (city park information desk) provided brief comments.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim membandingkan 33, 23, dan 25, membatasi klaim pada pusat informasi taman kota, serta merencanakan pengulangan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "analisis efektivitas peta kecil yang menampilkan waktu tempuh di pusat informasi taman kota",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, tim menguji peta kecil yang menampilkan waktu tempuh di pusat informasi taman kota.",
        },
        {
          isCorrect: false,
          label:
            "kerja sama tim dalam uji peta kecil yang menampilkan waktu tempuh di pusat informasi taman kota",
        },
        {
          isCorrect: false,
          label:
            "Para pengguna di pusat informasi taman kota memberikan komentar singkat.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
