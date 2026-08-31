import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Museum erhöht die Verlässlichkeit der Darstellung, indem es Dokumente, Erinnerungen und Unsicherheit trennt, statt eine Version zu erzwingen.",
        },
        {
          isCorrect: true,
          label:
            "Das Inventarbuch nennt einen Abendmarkt, während vier ehemalige Händler den Hauptbetrieb am Morgen erinnern.",
        },
        {
          isCorrect: false,
          label:
            "Der Unterschied könnte entstanden sein, weil Abendmarkt den Ort und nicht die Handelszeit bezeichnete.",
        },
        {
          isCorrect: false,
          label:
            "Das Museum wird Korrekturen mit einer überprüfbaren Quellenangabe annehmen.",
        },
        {
          isCorrect: false,
          label:
            "Schriftliche Unterlagen sind immer richtig, während jede mündliche Aussage verworfen werden muss.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The museum improves the reliability of the account by distinguishing records, memories, and uncertainty rather than forcing one version to win.",
        },
        {
          isCorrect: true,
          label:
            "The inventory book says evening market, while four former traders remember the main activity starting in the morning.",
        },
        {
          isCorrect: false,
          label:
            "The discrepancy may exist because evening market named the area rather than the trading hours.",
        },
        {
          isCorrect: false,
          label:
            "The museum will accept corrections that include a verifiable source trail.",
        },
        {
          isCorrect: false,
          label:
            "Written records are always correct, whereas all oral testimony must be rejected.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Museum meningkatkan keandalan keterangan dengan membedakan dokumen, ingatan, dan ketidakpastian, bukan dengan memaksa satu versi menang.",
        },
        {
          isCorrect: true,
          label:
            "Buku inventaris menyebut pasar sore, sedangkan empat mantan pedagang mengingat kegiatan utama sejak pagi.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan keterangan mungkin muncul karena istilah pasar sore dipakai untuk kawasan, bukan jam transaksi.",
        },
        {
          isCorrect: false,
          label:
            "Museum akan menerima koreksi yang dilengkapi asal sumber yang dapat diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Catatan tertulis selalu benar, sedangkan semua kesaksian lisan harus ditolak.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
