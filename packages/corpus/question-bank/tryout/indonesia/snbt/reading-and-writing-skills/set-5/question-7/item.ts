import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Beobachtenden nutzten Beispielfotos, weil die alten Beschreibungen nachweislich in jeder Situation unbrauchbar waren.",
        },
        {
          isCorrect: false,
          label:
            "Beispielfotos wurden dauerhaft eingeführt und die alten Beschreibungen nicht mehr genutzt.",
        },
        {
          isCorrect: false,
          label:
            "Fotos und alte Beschreibungen wurden ohne getrennte Versuchs- und Vergleichsbedingungen verwendet.",
        },
        {
          isCorrect: true,
          label:
            "Bei den Versuchsterminen nutzten die Beobachtenden zusätzliche Beispielfotos, während bei den Vergleichsterminen nur die bisherigen schriftlichen Beschreibungen verwendet wurden.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich Termine mit Beispielfotos nur mit Rückmeldungen zu den alten Beschreibungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Observers used sample photographs because the old descriptions had proved useless in every situation.",
        },
        {
          isCorrect: false,
          label:
            "Sample photographs were adopted permanently and the old descriptions were no longer used.",
        },
        {
          isCorrect: false,
          label:
            "Observers used photographs and old descriptions without separating trial and comparison conditions.",
        },
        {
          isCorrect: true,
          label:
            "In trial sessions, observers used added sample photographs, while comparison sessions used only the previous written descriptions.",
        },
        {
          isCorrect: false,
          label:
            "The team compared sessions using photographs only with comments about the old descriptions.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pencatat memakai contoh foto karena deskripsi lama telah terbukti tidak berguna dalam semua keadaan.",
        },
        {
          isCorrect: false,
          label:
            "Contoh foto diterapkan secara permanen dan deskripsi lama tidak dipakai lagi.",
        },
        {
          isCorrect: false,
          label:
            "Pencatat memakai foto dan deskripsi lama tanpa memisahkan kondisi uji dan pembanding.",
        },
        {
          isCorrect: true,
          label:
            "Pada sesi uji, pencatat memakai contoh foto tambahan, sedangkan pada sesi pembanding mereka hanya memakai deskripsi tertulis lama.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan sesi yang memakai contoh foto hanya dengan komentar tentang deskripsi lama.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
