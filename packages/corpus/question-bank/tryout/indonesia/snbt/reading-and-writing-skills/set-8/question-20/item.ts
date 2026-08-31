import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Da 29 über 19 und 21 lag, erklärte das Team ein Formular mit strukturierten Ortsangaben für wirksam und führte die Änderung dauerhaft ein.",
        },
        {
          isCorrect: true,
          label:
            "Das Team verglich 29, 19 und 21, begrenzte die Aussage auf den untersuchten Kontext (Fundbüroservice) und plante eine längere Wiederholung.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich 29, 19 und 21 und plante eine längere Wiederholung, ohne die Aussage auf Fundbüroservice zu begrenzen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team begrenzte die Aussage auf Fundbüroservice und plante eine längere Wiederholung, ohne den Vergleich zu nennen.",
        },
        {
          isCorrect: false,
          label:
            "Die Werte 29, 19 und 21 zeigten kein relevantes Muster, daher wollte das Team die Messregeln ändern.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because 29 exceeded 19 and 21, the team concluded that the change was effective and adopted it permanently.",
        },
        {
          isCorrect: true,
          label:
            "The team compared 29, 19, and 21, limited its claim to this setting (lost-property service), and planned a longer repetition.",
        },
        {
          isCorrect: false,
          label:
            "The team compared 29, 19, and 21 and planned a longer repetition without limiting the claim to the context of lost-property service.",
        },
        {
          isCorrect: false,
          label:
            "The team limited its claim to the context of lost-property service and planned a longer repetition without reporting the comparison.",
        },
        {
          isCorrect: false,
          label:
            "The values 29, 19, and 21 showed no relevant pattern, so the team planned to change the measurement rules.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena 29 lebih tinggi daripada 19 dan 21, tim menyimpulkan bahwa formulir dengan pilihan lokasi terstruktur efektif lalu menerapkannya secara tetap.",
        },
        {
          isCorrect: true,
          label:
            "Tim membandingkan 29, 19, dan 21, membatasi klaim pada layanan pencarian barang hilang, serta merencanakan pengulangan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 29, 19, dan 21 serta merencanakan pengulangan lebih panjang tanpa membatasi klaim pada layanan barang hilang.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi klaim pada layanan barang hilang dan merencanakan pengulangan lebih panjang tanpa melaporkan perbandingan.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 29, 19, dan 21 tidak menunjukkan pola yang relevan sehingga tim akan mengubah kaidah pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
