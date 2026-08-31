import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Test von eine Checkliste vor der Aufnahme erneut, um stärkere Belege als zuvor zu erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Um stärkere Belege zu erhalten, wurde der Test von eine Checkliste vor der Aufnahme vom Team erneut wiederholt.",
        },
        {
          isCorrect: false,
          label:
            "Das Team führte eine weitere Wiederholung des Tests von eine Checkliste vor der Aufnahme für stärkere Belege durch.",
        },
        {
          isCorrect: true,
          label:
            "Das Team wiederholte den Versuch mit folgender Änderung, um belastbarere Belege zu erhalten: eine Checkliste vor der Aufnahme.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wiederholte den Test, um stärkere Belege zu eine Checkliste vor der Aufnahme zu erhalten, die es bereits getestet hatte.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team repeated the test of a checklist used before recording again to obtain evidence that was stronger than before.",
        },
        {
          isCorrect: false,
          label:
            "To obtain stronger evidence, the test of a checklist used before recording was repeated again by the team.",
        },
        {
          isCorrect: false,
          label:
            "The team carried out another repetition of the test of a checklist used before recording for stronger evidence.",
        },
        {
          isCorrect: true,
          label:
            "The team repeated the test of a checklist used before recording to obtain stronger evidence.",
        },
        {
          isCorrect: false,
          label:
            "The team repeated the test to obtain stronger evidence about a checklist used before recording, which it had already tested.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim mengulang kembali uji daftar periksa sebelum perekaman untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Untuk memperoleh bukti lebih kuat, uji daftar periksa sebelum perekaman diulang kembali oleh tim.",
        },
        {
          isCorrect: false,
          label:
            "Tim melakukan pengulangan lain atas uji daftar periksa sebelum perekaman demi bukti yang lebih kuat.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengulang uji daftar pemeriksaan sebelum merekam untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengulang uji untuk memperoleh bukti lebih kuat tentang daftar periksa sebelum perekaman yang telah diuji sebelumnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
