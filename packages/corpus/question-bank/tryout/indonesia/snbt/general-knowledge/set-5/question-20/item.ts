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
            "Hohe Gebühreneinnahmen bedeuten nicht zwangsläufig, dass die Bibliothek besser funktioniert.",
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
            "Der Test wird um zwei Erinnerungswege und ein Einspruchsverfahren erweitert.",
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
            "A large amount of fine revenue does not necessarily mean the library service works better.",
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
            "The trial will expand with two reminder channels and an appeal process.",
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
            "Jumlah denda yang besar tidak selalu menunjukkan bahwa layanan perpustakaan bekerja lebih baik.",
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
            "Uji akan diperluas dengan dua saluran pengingat dan proses banding.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
