import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Der erste Teil vertritt die Behauptung "Nutzerkorrekturen betrafen häufiger beliebte Sammlungen"; der folgende nutzt "Wegen auftretender Fehler muss jede automatische Suche beendet werden" als Hauptbeleg.',
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil legt "Ein in der automatischen Suche fehlendes Dokument ist sicher nicht im Archiv vorhanden" als endgültigen Schluss fest; der folgende nennt nur den Plan "Das Team wird Leistungsunterschiede nach Schriftart und Zeitraum prüfen".',
        },
        {
          isCorrect: false,
          label:
            'Beide Teile halten ohne zusätzliche Prüfung aus derselben Sicht an "Wegen auftretender Fehler muss jede automatische Suche beendet werden" fest.',
        },
        {
          isCorrect: false,
          label:
            'Der folgende Teil kehrt die Argumentation um und leitet "Ein in der automatischen Suche fehlendes Dokument ist sicher nicht im Archiv vorhanden" aus dem Beleg "Nutzerkorrekturen betrafen häufiger beliebte Sammlungen" ab.',
        },
        {
          isCorrect: true,
          label:
            "Ungleiche Suchergebnisse zeigen eine Fehlerkette; Oberfläche und Prüfungen machen diese Grenzen anschließend kontrollierbar.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'The first part advances the claim "User corrections were more frequent for popular collections", and the later part uses "Because the system makes errors, all automated search must be stopped" as its main support.',
        },
        {
          isCorrect: false,
          label:
            'The first part establishes "A document absent from automated search is certainly not stored in the archive" as a final conclusion; the later part only states the plan "The team will audit performance differences by writing type and period".',
        },
        {
          isCorrect: false,
          label:
            'Both parts maintain the claim "Because the system makes errors, all automated search must be stopped" from the same perspective without adding a test.',
        },
        {
          isCorrect: false,
          label:
            'The later part reverses the argument by deriving "A document absent from automated search is certainly not stored in the archive" from the evidence "User corrections were more frequent for popular collections".',
        },
        {
          isCorrect: true,
          label:
            "Unequal search results reveal an error chain, and interface changes plus audits are designed to make those limits inspectable.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Koreksi pengguna lebih sering diberikan pada koleksi populer", lalu bagian kedua memakai "Karena sistem membuat kesalahan, semua pencarian otomatis harus dihentikan" sebagai dukungan utama.',
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Dokumen yang tidak muncul dalam pencarian otomatis pasti tidak tersimpan di arsip" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Tim akan mengaudit perbedaan kinerja menurut jenis tulisan dan periode".',
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Karena sistem membuat kesalahan, semua pencarian otomatis harus dihentikan" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Dokumen yang tidak muncul dalam pencarian otomatis pasti tidak tersimpan di arsip" dari bukti "Koreksi pengguna lebih sering diberikan pada koleksi populer".',
        },
        {
          isCorrect: true,
          label:
            "Perbedaan hasil pencarian mengungkap rantai kesalahan, lalu antarmuka dan audit dirancang untuk membuat batas itu dapat diperiksa.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
