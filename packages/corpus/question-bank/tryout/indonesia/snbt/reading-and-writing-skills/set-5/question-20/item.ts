import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team verglich 28, 20 und 22, begrenzte die Aussage auf den untersuchten Kontext (Aufnahmestudio der Schule) und plante eine längere Wiederholung.",
        },
        {
          isCorrect: false,
          label:
            "Da 28 über 20 und 22 lag, erklärte das Team eine Checkliste vor der Aufnahme für wirksam und führte die Änderung dauerhaft ein.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich 28, 20 und 22 und plante eine längere Wiederholung, ohne die Aussage auf schulisches Tonstudio zu begrenzen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team begrenzte die Aussage auf schulisches Tonstudio und plante eine längere Wiederholung, ohne den Vergleich zu nennen.",
        },
        {
          isCorrect: false,
          label:
            "Die Werte 28, 20 und 22 zeigten kein relevantes Muster, daher wollte das Team die Messregeln ändern.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The team compared 28, 20, and 22, limited its claim to this setting (school recording studio), and planned a longer repetition.",
        },
        {
          isCorrect: false,
          label:
            "Because 28 exceeded 20 and 22, the team concluded that the change was effective and adopted it permanently.",
        },
        {
          isCorrect: false,
          label:
            "The team compared 28, 20, and 22 and planned a longer repetition without limiting the claim to the context of school recording studio.",
        },
        {
          isCorrect: false,
          label:
            "The team limited its claim to the context of school recording studio and planned a longer repetition without reporting the comparison.",
        },
        {
          isCorrect: false,
          label:
            "The values 28, 20, and 22 showed no relevant pattern, so the team planned to change the measurement rules.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim membandingkan 28, 20, dan 22, membatasi klaim pada studio rekaman sekolah, serta merencanakan pengulangan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Karena 28 lebih tinggi daripada 20 dan 22, tim menyimpulkan bahwa daftar periksa sebelum perekaman efektif lalu menerapkannya secara tetap.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 28, 20, dan 22 serta merencanakan pengulangan lebih panjang tanpa membatasi klaim pada studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi klaim pada studio rekaman sekolah dan merencanakan pengulangan lebih panjang tanpa melaporkan perbandingan.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 28, 20, dan 22 tidak menunjukkan pola yang relevan sehingga tim akan mengubah kaidah pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
