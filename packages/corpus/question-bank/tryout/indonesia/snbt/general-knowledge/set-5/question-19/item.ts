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
            "Rückgaberegeln sollten an der Buchverfügbarkeit gemessen werden und Verspätungsdauer sowie Nutzerzugang unterscheiden.",
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
            "A late-return policy should be judged by book availability and should distinguish levels of delay and user access.",
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
            "Kebijakan yang sebanding menyesuaikan konsekuensi dengan lamanya keterlambatan dan dampaknya.",
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
            "Aturan keterlambatan dinilai dari dampaknya pada ketersediaan buku dan perlu membedakan tingkat pelanggaran serta akses pengguna.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
