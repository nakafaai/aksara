import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Der Konflikt zwischen Einfachheit und lokaler Erinnerung wird durch Quellenprüfung und unterschiedliche Namensfunktionen gelöst.",
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil vertritt die Behauptung "Der Verwaltungsname wurde als Hauptindex festgelegt"; der folgende nutzt "Jeder lokale Name muss denselben Rechtsstatus wie der Verwaltungsname erhalten" als Hauptbeleg.',
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil legt "Aus Gründen der Einheitlichkeit sollten alle nichtamtlichen Namen aus Suche und Archiv entfernt werden" als endgültigen Schluss fest; der folgende nennt nur den Plan "Neue Belege können den Eintrag ändern, ohne die frühere Namensgeschichte zu löschen".',
        },
        {
          isCorrect: false,
          label:
            'Beide Teile halten ohne zusätzliche Prüfung aus derselben Sicht an "Jeder lokale Name muss denselben Rechtsstatus wie der Verwaltungsname erhalten" fest.',
        },
        {
          isCorrect: false,
          label:
            'Der folgende Teil kehrt die Argumentation um und leitet "Aus Gründen der Einheitlichkeit sollten alle nichtamtlichen Namen aus Suche und Archiv entfernt werden" aus dem Beleg "Der Verwaltungsname wurde als Hauptindex festgelegt" ab.',
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The conflict between simplicity and local memory is answered through evidence checking and differentiated name functions.",
        },
        {
          isCorrect: false,
          label:
            'The first part advances the claim "The administrative name was selected as the primary index", and the later part uses "Every local name must have the same legal status as the administrative name" as its main support.',
        },
        {
          isCorrect: false,
          label:
            'The first part establishes "For consistency, every non-official name should be removed from search and archives" as a final conclusion; the later part only states the plan "New evidence may revise the record without erasing earlier naming history".',
        },
        {
          isCorrect: false,
          label:
            'Both parts maintain the claim "Every local name must have the same legal status as the administrative name" from the same perspective without adding a test.',
        },
        {
          isCorrect: false,
          label:
            'The later part reverses the argument by deriving "For consistency, every non-official name should be removed from search and archives" from the evidence "The administrative name was selected as the primary index".',
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Konflik antara kesederhanaan dan ingatan lokal dijawab dengan pemeriksaan bukti serta pembagian fungsi nama.",
        },
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Nama administrasi ditetapkan sebagai indeks utama", lalu bagian kedua memakai "Semua nama lokal harus memiliki kedudukan hukum yang sama dengan nama administrasi" sebagai dukungan utama.',
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Agar peta konsisten, semua nama selain nama resmi harus dihapus dari pencarian dan arsip" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Bukti baru dapat mengubah catatan tanpa menghapus riwayat nama sebelumnya".',
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Semua nama lokal harus memiliki kedudukan hukum yang sama dengan nama administrasi" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Agar peta konsisten, semua nama selain nama resmi harus dihapus dari pencarian dan arsip" dari bukti "Nama administrasi ditetapkan sebagai indeks utama".',
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
