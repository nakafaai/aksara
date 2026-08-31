import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Der erste Teil vertritt die Behauptung "Der Mittelteil der Brücke wurde 1958 weitgehend ersetzt"; der folgende nutzt "Wegen mehrerer Daten lässt sich kein Fakt zur Brückengeschichte feststellen" als Hauptbeleg.',
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil legt "Das älteste Datum ist für jede Art von Geschichte immer das passendste" als endgültigen Schluss fest; der folgende nennt nur den Plan "Die neue Tafel wird eine Zeitleiste mit der Bedeutung jedes Datums zeigen".',
        },
        {
          isCorrect: true,
          label:
            "Mehrere Daten erzeugen Mehrdeutigkeit; eine begriffliche Unterscheidung ermöglicht anschließend ein genaueres Schild.",
        },
        {
          isCorrect: false,
          label:
            'Beide Teile halten ohne zusätzliche Prüfung aus derselben Sicht an "Wegen mehrerer Daten lässt sich kein Fakt zur Brückengeschichte feststellen" fest.',
        },
        {
          isCorrect: false,
          label:
            'Der folgende Teil kehrt die Argumentation um und leitet "Das älteste Datum ist für jede Art von Geschichte immer das passendste" aus dem Beleg "Der Mittelteil der Brücke wurde 1958 weitgehend ersetzt" ab.',
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'The first part advances the claim "The bridge\'s central span was substantially replaced in 1958", and the later part uses "Because several dates exist, no fact about the bridge\'s history can be established" as its main support.',
        },
        {
          isCorrect: false,
          label:
            'The first part establishes "The oldest date is always the most appropriate for every kind of history" as a final conclusion; the later part only states the plan "The new plaque will display a timeline explaining each date".',
        },
        {
          isCorrect: true,
          label:
            "The discovery of several dates creates ambiguity, and a conceptual distinction is then used to construct a more accurate label.",
        },
        {
          isCorrect: false,
          label:
            'Both parts maintain the claim "Because several dates exist, no fact about the bridge\'s history can be established" from the same perspective without adding a test.',
        },
        {
          isCorrect: false,
          label:
            'The later part reverses the argument by deriving "The oldest date is always the most appropriate for every kind of history" from the evidence "The bridge\'s central span was substantially replaced in 1958".',
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Bagian tengah jembatan diganti besar-besaran pada 1958", lalu bagian kedua memakai "Karena ada beberapa tanggal, tidak ada satu pun fakta tentang riwayat jembatan yang dapat dipastikan" sebagai dukungan utama.',
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Satu tanggal paling tua selalu paling tepat untuk semua jenis sejarah" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Plakat baru akan menampilkan garis waktu dengan arti setiap tanggal".',
        },
        {
          isCorrect: true,
          label:
            "Temuan beberapa tanggal memunculkan ambiguitas, lalu pembedaan konsep digunakan untuk menyusun label yang lebih tepat.",
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Karena ada beberapa tanggal, tidak ada satu pun fakta tentang riwayat jembatan yang dapat dipastikan" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Satu tanggal paling tua selalu paling tepat untuk semua jenis sejarah" dari bukti "Bagian tengah jembatan diganti besar-besaran pada 1958".',
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
