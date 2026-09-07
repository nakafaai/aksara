import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Etiketten wurden verwendet, weil Lieferscheine nachweislich immer scheiterten.",
        },
        {
          isCorrect: false,
          label:
            "Die Etiketten wurden dauerhaft eingeführt und Lieferscheine abgeschafft.",
        },
        {
          isCorrect: false,
          label:
            "Etiketten und früherer Ablauf wurden ohne getrennte Vergleichsbedingungen verwendet.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verglich den Etiketteneinsatz nur mit Rückmeldungen zu Lieferscheinen.",
        },
        {
          isCorrect: true,
          label:
            "An Versuchstagen erhielt jedes Tablett ein wasserfestes Pflanzortetikett, während an Vergleichstagen das Ziel nur auf dem Lieferschein stand.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The labels were used because dispatch sheets had proved to fail in every situation.",
        },
        {
          isCorrect: false,
          label:
            "The labels were adopted permanently and dispatch sheets were discontinued.",
        },
        {
          isCorrect: false,
          label:
            "Labels and the old process were used without separate comparison conditions.",
        },
        {
          isCorrect: false,
          label:
            "The team compared label use only with comments about dispatch sheets.",
        },
        {
          isCorrect: true,
          label:
            "On trial days, each tray received a waterproof planting-site label, while on comparison days destinations appeared only on the dispatch sheet.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Label digunakan karena lembar pengiriman terbukti gagal dalam setiap keadaan.",
        },
        {
          isCorrect: false,
          label:
            "Label diterapkan permanen dan lembar pengiriman tidak dipakai lagi.",
        },
        {
          isCorrect: false,
          label:
            "Label dan cara lama digunakan tanpa kondisi pembanding terpisah.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan penggunaan label hanya dengan komentar tentang lembar pengiriman.",
        },
        {
          isCorrect: true,
          label:
            "Pada hari uji, tiap baki diberi label lokasi tanam tahan air, sedangkan pada hari pembanding tujuan hanya tertulis di lembar pengiriman.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
