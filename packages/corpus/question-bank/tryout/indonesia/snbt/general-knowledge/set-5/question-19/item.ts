import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Der begrenzte Test beweist, dass Gebühren in jedem Fall abgeschafft werden müssen.",
        },
        {
          isCorrect: true,
          label:
            "Eine verhältnismäßige Regel passt Folgen an Dauer und Wirkung der Verspätung an.",
        },
        {
          isCorrect: false,
          label:
            "Der Erfolg der Regel wird vor allem durch die Höhe der Gebühreneinnahmen bestimmt.",
        },
        {
          isCorrect: false,
          label:
            "Einige Nutzer erhielten wegen geänderter Telefonnummern keine Nachricht.",
        },
        {
          isCorrect: false,
          label:
            "Kurze und lange Verspätungen müssen immer dieselbe Folge haben, damit eine Regel als gerecht gilt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The limited trial proves that fines must be removed in every circumstance.",
        },
        {
          isCorrect: true,
          label:
            "A proportional policy matches consequences to the length and impact of a delay.",
        },
        {
          isCorrect: false,
          label:
            "Policy success is determined mainly by how much fine revenue is collected.",
        },
        {
          isCorrect: false,
          label:
            "Some users did not receive messages because their phone numbers had changed.",
        },
        {
          isCorrect: false,
          label:
            "Brief and long delays must always receive the same consequence for a policy to count as fair.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Uji terbatas membuktikan bahwa denda harus dihapus untuk semua keadaan.",
        },
        {
          isCorrect: true,
          label:
            "Kebijakan yang proporsional menyesuaikan konsekuensi dengan lamanya keterlambatan dan dampaknya.",
        },
        {
          isCorrect: false,
          label:
            "Keberhasilan kebijakan terutama ditentukan oleh banyaknya uang denda yang berhasil dikumpulkan.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian pengguna tidak menerima pesan karena nomor telepon berubah.",
        },
        {
          isCorrect: false,
          label:
            "Keterlambatan singkat dan panjang harus selalu dikenai konsekuensi yang sama agar aturan dianggap adil.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
