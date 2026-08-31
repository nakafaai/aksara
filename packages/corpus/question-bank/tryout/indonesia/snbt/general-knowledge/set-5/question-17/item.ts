import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Rückgaberegeln sollten an der Buchverfügbarkeit gemessen werden und Verspätungsdauer sowie Nutzerzugang unterscheiden.",
        },
        {
          isCorrect: false,
          label:
            "Einige Mitarbeiter halten hohe Gebühren für den einfachsten Weg zur Durchsetzung der Regel.",
        },
        {
          isCorrect: true,
          label:
            "Der begrenzte Test zeigte weniger kurze Verzögerungen durch Erinnerungen und schnellere Rückgaben einiger lange fehlender Bücher durch Sperren.",
        },
        {
          isCorrect: false,
          label:
            "Der Test wird um zwei Erinnerungswege und ein Einspruchsverfahren erweitert.",
        },
        {
          isCorrect: false,
          label:
            "Der begrenzte Test beweist, dass Gebühren in jedem Fall abgeschafft werden müssen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "A late-return policy should be judged by book availability and should distinguish levels of delay and user access.",
        },
        {
          isCorrect: false,
          label:
            "Some staff consider high fines the simplest way to enforce the rule.",
        },
        {
          isCorrect: true,
          label:
            "The limited trial showed that reminders reduced brief delays and restrictions accelerated some long-overdue returns.",
        },
        {
          isCorrect: false,
          label:
            "The trial will expand with two reminder channels and an appeal process.",
        },
        {
          isCorrect: false,
          label:
            "The limited trial proves that fines must be removed in every circumstance.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Aturan keterlambatan dinilai dari dampaknya pada ketersediaan buku dan perlu membedakan tingkat pelanggaran serta akses pengguna.",
        },
        {
          isCorrect: false,
          label:
            "Denda tinggi dianggap sebagian staf sebagai cara paling sederhana untuk menegakkan aturan.",
        },
        {
          isCorrect: true,
          label:
            "Uji terbatas menunjukkan pengingat mengurangi keterlambatan singkat dan pembatasan mempercepat beberapa pengembalian lama.",
        },
        {
          isCorrect: false,
          label:
            "Uji akan diperluas dengan dua saluran pengingat dan proses banding.",
        },
        {
          isCorrect: false,
          label:
            "Uji terbatas membuktikan bahwa denda harus dihapus untuk semua keadaan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
