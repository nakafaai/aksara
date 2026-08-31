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
          isCorrect: true,
          label:
            "Standardisierung und Bewahrung lokalen Wissens können zusammengehen, wenn die Funktion jedes Namens unterschieden wird.",
        },
        {
          isCorrect: false,
          label:
            "Neue Belege können den Eintrag ändern, ohne die frühere Namensgeschichte zu löschen.",
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
          isCorrect: true,
          label:
            "Standardisation and preservation of local knowledge can coexist when each name's function is distinguished.",
        },
        {
          isCorrect: false,
          label:
            "New evidence may revise the record without erasing earlier naming history.",
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
          isCorrect: true,
          label:
            "Standarisasi dan pelestarian pengetahuan lokal dapat berjalan bersama jika fungsi setiap nama dibedakan.",
        },
        {
          isCorrect: false,
          label:
            "Bukti baru dapat mengubah catatan tanpa menghapus riwayat nama sebelumnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
