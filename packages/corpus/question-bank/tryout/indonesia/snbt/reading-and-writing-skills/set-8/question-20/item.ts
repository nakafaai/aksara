import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Da 29 über 19 und 21 lag, ersetzte das Team sofort alle Freitextmeldungen durch das Auswahlformular.",
        },
        {
          isCorrect: true,
          label:
            "Das Team verglich die Mittelwerte 29, 19 und 21, befürwortete noch keinen vollständigen Ersatz der Freitextfelder und plante einen längeren Test zusätzlicher Ortsoptionen bei derselben Messgröße der Zuordnung am selben Tag.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich 29, 19 und 21 und plante weitere Tests, ohne die Aussage zu begrenzen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team behielt Freitextmeldungen bei und plante weitere Tests, ohne den Ergebnisvergleich zu nennen.",
        },
        {
          isCorrect: false,
          label:
            "Die Werte 29, 19 und 21 zeigten kein relevantes Muster, weshalb das Team die Messgröße für Zuordnungen ändern wollte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because 29 exceeded 19 and 21, the team immediately replaced all free-text reports with the selection form.",
        },
        {
          isCorrect: true,
          label:
            "The team compared means of 29, 19, and 21, did not yet support replacing all free-text fields, and planned a longer test of additional location choices using the same-day matching measure.",
        },
        {
          isCorrect: false,
          label:
            "The team compared 29, 19, and 21 and planned further testing without limiting the claim.",
        },
        {
          isCorrect: false,
          label:
            "The team retained free-text reporting and planned further testing without stating the result comparison.",
        },
        {
          isCorrect: false,
          label:
            "The values 29, 19, and 21 showed no relevant pattern, so the team planned to change the matching measure.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena 29 lebih tinggi daripada 19 dan 21, tim langsung mengganti seluruh laporan bebas dengan formulir pilihan.",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan rata-rata 29, 19, dan 21, belum membenarkan penggantian seluruh kolom bebas, serta merencanakan uji lebih panjang atas pilihan lokasi tambahan dengan ukuran pencocokan pada hari yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 29, 19, dan 21 serta merencanakan uji lanjutan tanpa membatasi cakupan klaim.",
        },
        {
          isCorrect: false,
          label:
            "Tim mempertahankan laporan bebas dan merencanakan uji lanjutan tanpa menyebut perbandingan hasil.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 29, 19, dan 21 tidak menunjukkan pola yang relevan sehingga tim akan mengubah ukuran pencocokan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
