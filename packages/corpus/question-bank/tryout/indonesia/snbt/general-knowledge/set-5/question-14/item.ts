import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Verspätungsmuster begründen zwei Vorschläge; Testergebnisse und Kommunikationsprobleme bestimmen die nächste Fassung.",
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil vertritt die Behauptung "Einige Nutzer erhielten wegen geänderter Telefonnummern keine Nachricht"; der folgende nutzt "Der begrenzte Test beweist, dass Gebühren in jedem Fall abgeschafft werden müssen" als Hauptbeleg.',
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil legt "Der Erfolg der Regel wird vor allem durch die Höhe der Gebühreneinnahmen bestimmt" als endgültigen Schluss fest; der folgende nennt nur den Plan "Der Test wird um zwei Erinnerungswege und ein Einspruchsverfahren erweitert".',
        },
        {
          isCorrect: false,
          label:
            'Beide Teile halten ohne zusätzliche Prüfung aus derselben Sicht an "Der begrenzte Test beweist, dass Gebühren in jedem Fall abgeschafft werden müssen" fest.',
        },
        {
          isCorrect: false,
          label:
            'Der folgende Teil kehrt die Argumentation um und leitet "Der Erfolg der Regel wird vor allem durch die Höhe der Gebühreneinnahmen bestimmt" aus dem Beleg "Einige Nutzer erhielten wegen geänderter Telefonnummern keine Nachricht" ab.',
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Delay patterns motivate two proposals, and trial results plus communication problems shape the next design.",
        },
        {
          isCorrect: false,
          label:
            'The first part advances the claim "Some users did not receive messages because their phone numbers had changed", and the later part uses "The limited trial proves that fines must be removed in every circumstance" as its main support.',
        },
        {
          isCorrect: false,
          label:
            'The first part establishes "Policy success is determined mainly by how much fine revenue is collected" as a final conclusion; the later part only states the plan "The trial will expand with two reminder channels and an appeal process".',
        },
        {
          isCorrect: false,
          label:
            'Both parts maintain the claim "The limited trial proves that fines must be removed in every circumstance" from the same perspective without adding a test.',
        },
        {
          isCorrect: false,
          label:
            'The later part reverses the argument by deriving "Policy success is determined mainly by how much fine revenue is collected" from the evidence "Some users did not receive messages because their phone numbers had changed".',
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pola keterlambatan menjadi dasar dua usulan, lalu hasil uji dan masalah komunikasi membentuk rancangan lanjutan.",
        },
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Sebagian pengguna tidak menerima pesan karena nomor telepon berubah", lalu bagian kedua memakai "Uji terbatas membuktikan bahwa denda harus dihapus untuk semua keadaan" sebagai dukungan utama.',
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Keberhasilan kebijakan terutama ditentukan oleh banyaknya uang denda yang berhasil dikumpulkan" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Uji akan diperluas dengan dua saluran pengingat dan proses banding".',
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Uji terbatas membuktikan bahwa denda harus dihapus untuk semua keadaan" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Keberhasilan kebijakan terutama ditentukan oleh banyaknya uang denda yang berhasil dikumpulkan" dari bukti "Sebagian pengguna tidak menerima pesan karena nomor telepon berubah".',
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
