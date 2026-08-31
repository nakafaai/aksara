import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Der erste Teil vertritt die Behauptung "Bei Flutaufnahmen blieb die Übereinstimmung geringer"; der folgende nutzt "Klassifikationsfehler machen sämtliche Freiwilligendaten wissenschaftlich wertlos" als Hauptbeleg.',
        },
        {
          isCorrect: true,
          label:
            "Der Anstieg der Meldungen deutet Erholung an; Prüfungen von Zugang und Klassifikation begrenzen anschließend diese Deutung.",
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil legt "Ein Gebiet ohne Meldungen enthält mit Sicherheit keine Mangrovensetzlinge" als endgültigen Schluss fest; der folgende nennt nur den Plan "Die öffentliche Karte wird Meldungen, Beobachtungsintensität und Validierung trennen".',
        },
        {
          isCorrect: false,
          label:
            'Beide Teile halten ohne zusätzliche Prüfung aus derselben Sicht an "Klassifikationsfehler machen sämtliche Freiwilligendaten wissenschaftlich wertlos" fest.',
        },
        {
          isCorrect: false,
          label:
            'Der folgende Teil kehrt die Argumentation um und leitet "Ein Gebiet ohne Meldungen enthält mit Sicherheit keine Mangrovensetzlinge" aus dem Beleg "Bei Flutaufnahmen blieb die Übereinstimmung geringer" ab.',
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'The first part advances the claim "Agreement remained lower for high-tide photographs", and the later part uses "Classification errors make all volunteer data scientifically worthless" as its main support.',
        },
        {
          isCorrect: true,
          label:
            "A rise in reports suggests recovery, and audits of access and classification then constrain that interpretation.",
        },
        {
          isCorrect: false,
          label:
            'The first part establishes "An area without reports certainly contains no mangrove seedlings" as a final conclusion; the later part only states the plan "The public map will separate reports, observation intensity, and validation".',
        },
        {
          isCorrect: false,
          label:
            'Both parts maintain the claim "Classification errors make all volunteer data scientifically worthless" from the same perspective without adding a test.',
        },
        {
          isCorrect: false,
          label:
            'The later part reverses the argument by deriving "An area without reports certainly contains no mangrove seedlings" from the evidence "Agreement remained lower for high-tide photographs".',
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Kesepakatan pada foto saat air pasang tetap lebih rendah", lalu bagian kedua memakai "Kesalahan klasifikasi membuat seluruh data relawan tidak memiliki nilai ilmiah" sebagai dukungan utama.',
        },
        {
          isCorrect: true,
          label:
            "Lonjakan laporan memunculkan dugaan pemulihan, lalu audit akses dan klasifikasi membatasi cara dugaan itu ditafsirkan.",
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Daerah tanpa laporan pasti tidak memiliki bibit mangrove" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Peta publik akan memisahkan laporan, intensitas pengamatan, dan validasi".',
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Kesalahan klasifikasi membuat seluruh data relawan tidak memiliki nilai ilmiah" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Daerah tanpa laporan pasti tidak memiliki bibit mangrove" dari bukti "Kesepakatan pada foto saat air pasang tetap lebih rendah".',
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
