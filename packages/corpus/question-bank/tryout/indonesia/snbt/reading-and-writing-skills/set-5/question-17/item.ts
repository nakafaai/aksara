import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wiederholte erneut noch einmal den Versuch zu eine Checkliste vor der Aufnahme, um belastbarere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte eine Wiederholung des Versuchs zu eine Checkliste vor der Aufnahme mit dem Ziel durch, damit belastbarere Belege erhalten werden können.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wiederholte den Versuch mit folgender Änderung, um belastbarere Belege zu erhalten: eine Checkliste vor der Aufnahme.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Versuch zu eine Checkliste vor der Aufnahme, um sehr viel belastbarere stärkere Belege zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Eine Wiederholung wurde vom Team erneut für eine Checkliste vor der Aufnahme durchgeführt, und zwar für Belege.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team repeated the test of a checklist used before recording again once more to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team carried out a repetition of the test of a checklist used before recording for the purpose of being able to obtain evidence that was stronger.",
        },
        {
          isCorrect: true,
          label:
            "The team repeated the test of a checklist used before recording to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team repeated the test of a checklist used before recording to obtain very much stronger and more strong evidence.",
        },
        {
          isCorrect: false,
          label:
            "A repetition was repeated by the team for a checklist used before recording in order for evidence.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim mengulang kembali lagi uji daftar pemeriksaan sebelum merekam untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim melakukan pengulangan atas uji daftar pemeriksaan sebelum merekam dengan tujuan agar supaya dapat memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengulang uji daftar pemeriksaan sebelum merekam untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengulang uji daftar pemeriksaan sebelum merekam untuk memperoleh bukti yang lebih sangat kuat sekali.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan kembali dilakukan lagi oleh tim atas daftar pemeriksaan sebelum merekam untuk bukti.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
