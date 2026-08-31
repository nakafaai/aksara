import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Der erste Teil vertritt die Behauptung "Das Museum wird die Überarbeitungsgeschichte des Ausstellungsschildes anzeigen"; der folgende nutzt "Schriftliche Unterlagen sind immer richtig, während jede mündliche Aussage verworfen werden muss" als Hauptbeleg.',
        },
        {
          isCorrect: true,
          label:
            "Der anfängliche Widerspruch führt zur Quellenprüfung, deren Ergebnis die transparente Beschriftung bestimmt.",
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil legt "Das Museum sollte die spannendste Geschichte wählen und störende Angaben entfernen" als endgültigen Schluss fest; der folgende nennt nur den Plan "Das Museum wird Korrekturen mit einer überprüfbaren Quellenangabe annehmen".',
        },
        {
          isCorrect: false,
          label:
            'Beide Teile halten ohne zusätzliche Prüfung aus derselben Sicht an "Schriftliche Unterlagen sind immer richtig, während jede mündliche Aussage verworfen werden muss" fest.',
        },
        {
          isCorrect: false,
          label:
            'Der folgende Teil kehrt die Argumentation um und leitet "Das Museum sollte die spannendste Geschichte wählen und störende Angaben entfernen" aus dem Beleg "Das Museum wird die Überarbeitungsgeschichte des Ausstellungsschildes anzeigen" ab.',
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'The first part advances the claim "The museum will display the exhibition label\'s revision history", and the later part uses "Written records are always correct, whereas all oral testimony must be rejected" as its main support.',
        },
        {
          isCorrect: true,
          label:
            "The initial conflict prompts source checking, and the result of that checking shapes the museum's transparent label.",
        },
        {
          isCorrect: false,
          label:
            'The first part establishes "The museum should choose the most engaging story and remove details that disrupt the narrative" as a final conclusion; the later part only states the plan "The museum will accept corrections that include a verifiable source trail".',
        },
        {
          isCorrect: false,
          label:
            'Both parts maintain the claim "Written records are always correct, whereas all oral testimony must be rejected" from the same perspective without adding a test.',
        },
        {
          isCorrect: false,
          label:
            'The later part reverses the argument by deriving "The museum should choose the most engaging story and remove details that disrupt the narrative" from the evidence "The museum will display the exhibition label\'s revision history".',
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Museum akan menampilkan riwayat revisi label pameran", lalu bagian kedua memakai "Catatan tertulis selalu benar, sedangkan semua kesaksian lisan harus ditolak" sebagai dukungan utama.',
        },
        {
          isCorrect: true,
          label:
            "Perbedaan awal mendorong pemeriksaan sumber, lalu hasil pemeriksaan menentukan cara museum menulis label secara transparan.",
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Museum sebaiknya memilih kisah paling menarik dan menghapus keterangan yang mengganggu kelancaran cerita" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Museum akan menerima koreksi yang dilengkapi asal sumber yang dapat diperiksa".',
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Catatan tertulis selalu benar, sedangkan semua kesaksian lisan harus ditolak" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Museum sebaiknya memilih kisah paling menarik dan menghapus keterangan yang mengganggu kelancaran cerita" dari bukti "Museum akan menampilkan riwayat revisi label pameran".',
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
