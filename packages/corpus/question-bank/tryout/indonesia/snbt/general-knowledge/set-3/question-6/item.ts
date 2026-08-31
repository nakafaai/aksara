import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "eine Quelle wiederholt prüfen, bis ihre Darstellung konsistent erscheint",
        },
        {
          isCorrect: false,
          label:
            "die anschaulichste Erzählung ohne Prüfung ihrer Herkunft auswählen",
        },
        {
          isCorrect: false,
          label:
            "allen Quellen ohne Berücksichtigung ihres Kontexts gleiches Gewicht geben",
        },
        {
          isCorrect: false,
          label:
            "Wortunterschiede bearbeiten, bis alle Darstellungen einheitlich wirken",
        },
        {
          isCorrect: true,
          label:
            "unabhängige Quellen zu vergleichen, bevor eine Schlussfolgerung festgelegt wird",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "checking one source repeatedly until its account appears consistent",
        },
        {
          isCorrect: false,
          label:
            "choosing the most vivid account without examining its origin or production",
        },
        {
          isCorrect: false,
          label:
            "giving every source equal weight without considering its context",
        },
        {
          isCorrect: false,
          label:
            "editing differences in wording until all accounts appear uniform",
        },
        {
          isCorrect: true,
          label: "comparing independent sources before settling a conclusion",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "memeriksa satu sumber berulang kali sampai keterangannya tampak konsisten",
        },
        {
          isCorrect: false,
          label:
            "memilih kisah yang paling hidup tanpa menilai asal dan proses pembentukannya",
        },
        {
          isCorrect: false,
          label:
            "memberi bobot yang sama kepada semua sumber tanpa melihat konteksnya",
        },
        {
          isCorrect: false,
          label:
            "menyunting perbedaan kata sampai seluruh keterangan tampak seragam",
        },
        {
          isCorrect: true,
          label:
            "membandingkan beberapa sumber yang berdiri sendiri sebelum menetapkan kesimpulan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
