import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Der erste Teil vertritt die Behauptung "Anonyme Beobachter verwendeten vorab festgelegte Lautstärkekriterien"; der folgende nutzt "Jede Botschaft mit einer Mehrheitsangabe verändert sicher das Verhalten aller Fahrgäste" als Hauptbeleg.',
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil legt "Weil Beschwerden sanken, muss die Gesamtzahl lauter Gespräche im selben Maß gesunken sein" als endgültigen Schluss fest; der folgende nennt nur den Plan "Der Betreiber wird Mehrheitszahlen aus aktuellen Beobachtungen verwenden".',
        },
        {
          isCorrect: false,
          label:
            'Beide Teile halten ohne zusätzliche Prüfung aus derselben Sicht an "Jede Botschaft mit einer Mehrheitsangabe verändert sicher das Verhalten aller Fahrgäste" fest.',
        },
        {
          isCorrect: false,
          label:
            'Der folgende Teil kehrt die Argumentation um und leitet "Weil Beschwerden sanken, muss die Gesamtzahl lauter Gespräche im selben Maß gesunken sein" aus dem Beleg "Anonyme Beobachter verwendeten vorab festgelegte Lautstärkekriterien" ab.',
        },
        {
          isCorrect: true,
          label:
            "Erste Ergebnisse erzeugen eine Hypothese, die Kontrolle von Störfaktoren prüft sie, und spätere Befunde begrenzen ihre Anwendung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'The first part advances the claim "Anonymous observers used predefined volume criteria", and the later part uses "Any message mentioning a majority will certainly change every passenger\'s behaviour" as its main support.',
        },
        {
          isCorrect: false,
          label:
            'The first part establishes "Because complaints fell, the total number of loud conversations must have fallen by the same amount" as a final conclusion; the later part only states the plan "The operator will use majority figures drawn from recent observations".',
        },
        {
          isCorrect: false,
          label:
            'Both parts maintain the claim "Any message mentioning a majority will certainly change every passenger\'s behaviour" from the same perspective without adding a test.',
        },
        {
          isCorrect: false,
          label:
            'The later part reverses the argument by deriving "Because complaints fell, the total number of loud conversations must have fallen by the same amount" from the evidence "Anonymous observers used predefined volume criteria".',
        },
        {
          isCorrect: true,
          label:
            "Initial results generate a hypothesis, control of confounders tests it, and later findings limit its application.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Pengamat anonim memakai kriteria volume yang telah ditetapkan", lalu bagian kedua memakai "Setiap pesan yang menyebut mayoritas pasti mengubah perilaku semua penumpang" sebagai dukungan utama.',
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Karena keluhan berkurang, jumlah seluruh percakapan keras pasti turun dengan ukuran yang sama" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Pengelola akan menggunakan angka mayoritas yang berasal dari pengamatan terbaru".',
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Setiap pesan yang menyebut mayoritas pasti mengubah perilaku semua penumpang" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Karena keluhan berkurang, jumlah seluruh percakapan keras pasti turun dengan ukuran yang sama" dari bukti "Pengamat anonim memakai kriteria volume yang telah ditetapkan".',
        },
        {
          isCorrect: true,
          label:
            "Hasil awal memunculkan hipotesis, pengendalian faktor pengganggu mengujinya, dan temuan lanjutan membatasi penerapannya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
