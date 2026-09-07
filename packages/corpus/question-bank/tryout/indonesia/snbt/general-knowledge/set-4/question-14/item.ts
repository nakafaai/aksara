import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Jeder lokale Name muss denselben Rechtsstatus wie der Verwaltungsname erhalten.",
        },
        {
          isCorrect: false,
          label:
            "Aus Gründen der Einheitlichkeit sollten alle nichtamtlichen Namen aus Suche und Archiv entfernt werden.",
        },
        {
          isCorrect: false,
          label: "Der Verwaltungsname wurde als Hauptindex festgelegt.",
        },
        {
          isCorrect: false,
          label:
            "Ein als Alias gespeicherter Ortsname erhält automatisch denselben amtlichen Status wie der Verwaltungsname.",
        },
        {
          isCorrect: true,
          label:
            "Die Wahl eines Hauptnamens verlangt nicht, andere belegte Namen zu löschen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Every local name must have the same legal status as the administrative name.",
        },
        {
          isCorrect: false,
          label:
            "For consistency, every non-official name should be removed from search and archives.",
        },
        {
          isCorrect: false,
          label: "The administrative name was selected as the primary index.",
        },
        {
          isCorrect: false,
          label:
            "Storing a local name as an alias automatically gives it the same official status as the administrative name.",
        },
        {
          isCorrect: true,
          label:
            "Choosing a primary name does not require deleting other names with a record of use.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Semua nama lokal harus memiliki kedudukan hukum yang sama dengan nama administrasi.",
        },
        {
          isCorrect: false,
          label:
            "Agar peta konsisten, semua nama selain nama resmi harus dihapus dari pencarian dan arsip.",
        },
        {
          isCorrect: false,
          label: "Nama administrasi ditetapkan sebagai indeks utama.",
        },
        {
          isCorrect: false,
          label:
            "Penyimpanan nama lokal sebagai alias otomatis memberinya kedudukan resmi yang sama dengan nama administrasi.",
        },
        {
          isCorrect: true,
          label:
            "Menetapkan nama utama tidak mengharuskan penghapusan nama lain yang memiliki jejak penggunaan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
