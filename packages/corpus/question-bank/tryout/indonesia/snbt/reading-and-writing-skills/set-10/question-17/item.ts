import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Test von kleine Karten mit Gehzeiten erneut, um stärkere Belege als zuvor zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Um stärkere Belege zu erhalten, wurde der Test von kleine Karten mit Gehzeiten vom Team erneut wiederholt.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte eine weitere Wiederholung des Tests von kleine Karten mit Gehzeiten für stärkere Belege durch.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Test, um stärkere Belege zu kleine Karten mit Gehzeiten zu erhalten, die es bereits getestet hatte.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wiederholte den Versuch mit folgender Änderung, um belastbarere Belege zu erhalten: kleine Karten mit Gehzeiten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team repeated the test of small maps showing walking times again to obtain evidence that was stronger than before.",
        },
        {
          isCorrect: false,
          label:
            "To obtain stronger evidence, the test of small maps showing walking times was repeated again by the team.",
        },
        {
          isCorrect: false,
          label:
            "The team carried out another repetition of the test of small maps showing walking times for stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team repeated the test to obtain stronger evidence about small maps showing walking times, which it had already tested.",
        },
        {
          isCorrect: true,
          label:
            "The team repeated the test of small maps showing walking times to obtain stronger evidence.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim mengulang kembali uji peta kecil yang menampilkan waktu tempuh untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Untuk memperoleh bukti lebih kuat, uji peta kecil yang menampilkan waktu tempuh diulang kembali oleh tim.",
        },
        {
          isCorrect: false,
          label:
            "Tim melakukan pengulangan lain atas uji peta kecil yang menampilkan waktu tempuh demi bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengulang uji untuk memperoleh bukti lebih kuat tentang peta kecil yang menampilkan waktu tempuh yang telah diuji sebelumnya.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengulang uji peta kecil yang menampilkan waktu tempuh untuk memperoleh bukti yang lebih kuat.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
