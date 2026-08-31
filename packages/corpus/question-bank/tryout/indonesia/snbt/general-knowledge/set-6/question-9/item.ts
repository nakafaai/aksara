import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Erste Ergebnisse zeigen Potenzial, Zugangsprobleme machen Ungleichheit sichtbar, und Änderungen prüfen diese Erklärung.",
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil vertritt die Behauptung "Eine Rückgabestelle wurde verlegt und länger geöffnet"; der folgende nutzt "Die Rückgabequote des ersten Abends beweist, dass das System unverändert dauerhaft eingeführt werden sollte" als Hauptbeleg.',
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil legt "Weil Beschwerden auftraten, kann ein Pfand das Verhalten nicht beeinflussen" als endgültigen Schluss fest; der folgende nennt nur den Plan "Die Abschlussbewertung wird Reinigungskosten und verlorene Behälter berücksichtigen".',
        },
        {
          isCorrect: false,
          label:
            'Beide Teile halten ohne zusätzliche Prüfung aus derselben Sicht an "Die Rückgabequote des ersten Abends beweist, dass das System unverändert dauerhaft eingeführt werden sollte" fest.',
        },
        {
          isCorrect: false,
          label:
            'Der folgende Teil kehrt die Argumentation um und leitet "Weil Beschwerden auftraten, kann ein Pfand das Verhalten nicht beeinflussen" aus dem Beleg "Eine Rückgabestelle wurde verlegt und länger geöffnet" ab.',
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Initial results show potential, access problems reveal inequality, and service changes test that explanation.",
        },
        {
          isCorrect: false,
          label:
            'The first part advances the claim "One return desk was moved and its hours were extended", and the later part uses "The first-night return rate proves the system should become permanent without revision" as its main support.',
        },
        {
          isCorrect: false,
          label:
            'The first part establishes "Because complaints occurred, a deposit cannot influence visitor behaviour" as a final conclusion; the later part only states the plan "The final evaluation will include washing costs and lost containers".',
        },
        {
          isCorrect: false,
          label:
            'Both parts maintain the claim "The first-night return rate proves the system should become permanent without revision" from the same perspective without adding a test.',
        },
        {
          isCorrect: false,
          label:
            'The later part reverses the argument by deriving "Because complaints occurred, a deposit cannot influence visitor behaviour" from the evidence "One return desk was moved and its hours were extended".',
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Hasil awal menunjukkan potensi, masalah akses mengungkap ketimpangan, dan perbaikan layanan menguji penjelasan tersebut.",
        },
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Satu loket dipindahkan dan jam layanannya diperpanjang", lalu bagian kedua memakai "Tingkat pengembalian malam pertama membuktikan sistem harus diterapkan permanen tanpa perubahan" sebagai dukungan utama.',
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Karena ada keluhan, uang jaminan tidak mungkin memengaruhi perilaku pengunjung" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Evaluasi akhir akan memasukkan biaya pencucian dan kehilangan wadah".',
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Tingkat pengembalian malam pertama membuktikan sistem harus diterapkan permanen tanpa perubahan" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Karena ada keluhan, uang jaminan tidak mungkin memengaruhi perilaku pengunjung" dari bukti "Satu loket dipindahkan dan jam layanannya diperpanjang".',
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
