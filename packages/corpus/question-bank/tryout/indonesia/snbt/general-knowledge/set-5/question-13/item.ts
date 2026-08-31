import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "für jede Verspätung dieselbe Folge festlegen",
        },
        {
          isCorrect: false,
          label: "die nach Regeln härteste mögliche Folge wählen",
        },
        {
          isCorrect: false,
          label: "Folgen allein nach erwarteten Gebühreneinnahmen bestimmen",
        },
        {
          isCorrect: false,
          label: "Folgen für jede Person zufällig verändern",
        },
        {
          isCorrect: true,
          label: "an Schwere des Fehlers und verursachter Wirkung ausgerichtet",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "giving the same consequence for every delay",
        },
        {
          isCorrect: false,
          label: "choosing the harshest consequence permitted by the rules",
        },
        {
          isCorrect: false,
          label: "setting a consequence solely from expected fine revenue",
        },
        {
          isCorrect: false,
          label: "changing consequences randomly for each user",
        },
        {
          isCorrect: true,
          label:
            "matched to the severity of the mistake and the harm it causes",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "memberi konsekuensi yang sama untuk setiap keterlambatan",
        },
        {
          isCorrect: false,
          label: "memilih konsekuensi terberat yang diizinkan aturan",
        },
        {
          isCorrect: false,
          label: "menentukan konsekuensi hanya dari besarnya pendapatan denda",
        },
        {
          isCorrect: false,
          label: "mengubah konsekuensi secara acak untuk setiap pengguna",
        },
        {
          isCorrect: true,
          label:
            "sebanding dengan tingkat kesalahan dan dampak yang ditimbulkan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
