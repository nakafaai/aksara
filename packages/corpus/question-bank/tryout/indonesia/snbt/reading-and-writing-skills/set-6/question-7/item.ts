import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Pfeile wurden angebracht, weil der alte Rundgang nachweislich in jeder Situation unbrauchbar war.",
        },
        {
          isCorrect: false,
          label:
            "Die Pfeile wurden dauerhaft eingeführt und Termine ohne Pfeile eingestellt.",
        },
        {
          isCorrect: false,
          label:
            "Pfeile und die Bedingung ohne Pfeile wurden ohne getrennte Vergleichstermine geprüft.",
        },
        {
          isCorrect: false,
          label:
            "Termine mit Pfeilen wurden nur mit Rückmeldungen zum alten Rundgang verglichen.",
        },
        {
          isCorrect: true,
          label:
            "Bei den Versuchsterminen wurden an jeder Abzweigung Pfeile angebracht, während die Vergleichstermine ohne zusätzliche Pfeile stattfanden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Arrows were added because the old route had proved useless in every situation.",
        },
        {
          isCorrect: false,
          label:
            "Arrows were adopted permanently and sessions without arrows were discontinued.",
        },
        {
          isCorrect: false,
          label:
            "Arrows and the condition without arrows were tested without separate comparison sessions.",
        },
        {
          isCorrect: false,
          label:
            "Sessions with arrows were compared only with comments about the old route.",
        },
        {
          isCorrect: true,
          label:
            "Arrows were placed at every junction in trial sessions, while comparison sessions had no additional arrows.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Panah dipasang karena rute lama terbukti tidak berguna dalam semua keadaan.",
        },
        {
          isCorrect: false,
          label:
            "Panah diterapkan permanen dan kondisi tanpa panah tidak digunakan lagi.",
        },
        {
          isCorrect: false,
          label:
            "Panah dan kondisi tanpa panah diuji tanpa memisahkan kelompok sesi pembanding.",
        },
        {
          isCorrect: false,
          label:
            "Sesi dengan panah hanya dibandingkan dengan komentar tentang rute lama.",
        },
        {
          isCorrect: true,
          label:
            "Pada sesi uji, panah dipasang di setiap persimpangan, sedangkan sesi pembanding berlangsung tanpa panah tambahan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
