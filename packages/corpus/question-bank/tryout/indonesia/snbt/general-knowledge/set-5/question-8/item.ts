import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Der erste Teil vertritt die Behauptung "Die Eröffnungsfeier fand Monate nach dem Umzug einiger Klassen statt"; der folgende nutzt "Schriftliche Dokumente beweisen, dass mündliche Aussagen historisch wertlos sind" als Hauptbeleg.',
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil legt "Das Archiv sollte die sicherste Aussage wählen und abweichende Aufnahmen löschen" als endgültigen Schluss fest; der folgende nennt nur den Plan "Originalaufnahmen bleiben erhalten, damit spätere Forscher die Deutung neu bewerten können".',
        },
        {
          isCorrect: false,
          label:
            'Beide Teile halten ohne zusätzliche Prüfung aus derselben Sicht an "Schriftliche Dokumente beweisen, dass mündliche Aussagen historisch wertlos sind" fest.',
        },
        {
          isCorrect: true,
          label:
            "Der Widerspruch führt zur Dokumentenprüfung; deren Ergebnis ermöglicht eine Deutung, die beide Stimmen bewahrt.",
        },
        {
          isCorrect: false,
          label:
            'Der folgende Teil kehrt die Argumentation um und leitet "Das Archiv sollte die sicherste Aussage wählen und abweichende Aufnahmen löschen" aus dem Beleg "Die Eröffnungsfeier fand Monate nach dem Umzug einiger Klassen statt" ab.',
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'The first part advances the claim "The opening ceremony took place months after some classes moved", and the later part uses "Written documents prove that oral testimony has no historical value" as its main support.',
        },
        {
          isCorrect: false,
          label:
            'The first part establishes "The archive should choose the most confident witness and delete inconsistent recordings" as a final conclusion; the later part only states the plan "Original recordings are preserved so later researchers can reassess the interpretation".',
        },
        {
          isCorrect: false,
          label:
            'Both parts maintain the claim "Written documents prove that oral testimony has no historical value" from the same perspective without adding a test.',
        },
        {
          isCorrect: true,
          label:
            "Conflicting testimony prompts document checking, whose results support an interpretation that retains both voices.",
        },
        {
          isCorrect: false,
          label:
            'The later part reverses the argument by deriving "The archive should choose the most confident witness and delete inconsistent recordings" from the evidence "The opening ceremony took place months after some classes moved".',
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Upacara peresmian berlangsung beberapa bulan setelah sebagian kelas pindah", lalu bagian kedua memakai "Dokumen tertulis membuktikan bahwa kesaksian lisan tidak memiliki nilai sejarah" sebagai dukungan utama.',
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Arsip harus memilih narasumber yang paling yakin dan menghapus rekaman yang tidak sesuai" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Rekaman asli disimpan agar tafsir dapat dinilai ulang oleh peneliti berikutnya".',
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Dokumen tertulis membuktikan bahwa kesaksian lisan tidak memiliki nilai sejarah" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: true,
          label:
            "Pertentangan kesaksian memicu pemeriksaan dokumen, lalu hasilnya dipakai untuk menyusun tafsir yang tetap menampilkan kedua suara.",
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Arsip harus memilih narasumber yang paling yakin dan menghapus rekaman yang tidak sesuai" dari bukti "Upacara peresmian berlangsung beberapa bulan setelah sebagian kelas pindah".',
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
