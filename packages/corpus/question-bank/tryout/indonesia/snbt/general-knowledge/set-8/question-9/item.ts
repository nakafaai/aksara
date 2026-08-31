import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Beschränkung auf ein Feld zeigt Kontextverlust; anschließend werden Metadaten für Suche und Zuschreibung getrennt.",
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil vertritt die Behauptung "Ein Name im alten Buch wurde von einem Kurator geschaffen"; der folgende nutzt "Jedes Objekt muss ohne Haupttitel erscheinen, damit alle Namen wirklich gleichgestellt sind" als Hauptbeleg.',
        },
        {
          isCorrect: false,
          label:
            'Der erste Teil legt "Der am häufigsten zitierte Name muss von der Herstellerin stammen" als endgültigen Schluss fest; der folgende nennt nur den Plan "Suchergebnisse werden die Quelle jedes Namens anzeigen".',
        },
        {
          isCorrect: false,
          label:
            'Beide Teile halten ohne zusätzliche Prüfung aus derselben Sicht an "Jedes Objekt muss ohne Haupttitel erscheinen, damit alle Namen wirklich gleichgestellt sind" fest.',
        },
        {
          isCorrect: false,
          label:
            'Der folgende Teil kehrt die Argumentation um und leitet "Der am häufigsten zitierte Name muss von der Herstellerin stammen" aus dem Beleg "Ein Name im alten Buch wurde von einem Kurator geschaffen" ab.',
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The one-field limitation exposes lost context, and metadata are then separated to improve search and attribution.",
        },
        {
          isCorrect: false,
          label:
            'The first part advances the claim "One name in an old book was created by a curator", and the later part uses "Every object must be displayed without a primary title for all names to be truly equal" as its main support.',
        },
        {
          isCorrect: false,
          label:
            'The first part establishes "The most frequently cited name must be the one given by the cloth\'s maker" as a final conclusion; the later part only states the plan "Search results will display the source of every name".',
        },
        {
          isCorrect: false,
          label:
            'Both parts maintain the claim "Every object must be displayed without a primary title for all names to be truly equal" from the same perspective without adding a test.',
        },
        {
          isCorrect: false,
          label:
            'The later part reverses the argument by deriving "The most frequently cited name must be the one given by the cloth\'s maker" from the evidence "One name in an old book was created by a curator".',
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Keterbatasan satu kolom menyingkap hilangnya konteks, lalu metadata dipisahkan untuk memperbaiki pencarian dan atribusi.",
        },
        {
          isCorrect: false,
          label:
            'Bagian awal mengajukan klaim "Salah satu nama dalam buku lama dibuat oleh kurator", lalu bagian kedua memakai "Setiap objek harus ditampilkan tanpa judul utama agar semua nama benar-benar setara" sebagai dukungan utama.',
        },
        {
          isCorrect: false,
          label:
            'Bagian pertama menetapkan "Nama yang paling sering dikutip pasti merupakan nama yang diberikan pembuat kain" sebagai simpulan final; bagian berikutnya hanya menyebut rencana "Hasil pencarian akan menampilkan sumber setiap nama".',
        },
        {
          isCorrect: false,
          label:
            'Kedua bagian mempertahankan klaim "Setiap objek harus ditampilkan tanpa judul utama agar semua nama benar-benar setara" dari sudut yang sama tanpa menambahkan pemeriksaan.',
        },
        {
          isCorrect: false,
          label:
            'Bagian kedua membalik arah pembahasan dengan menyimpulkan "Nama yang paling sering dikutip pasti merupakan nama yang diberikan pembuat kain" dari bukti "Salah satu nama dalam buku lama dibuat oleh kurator".',
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
