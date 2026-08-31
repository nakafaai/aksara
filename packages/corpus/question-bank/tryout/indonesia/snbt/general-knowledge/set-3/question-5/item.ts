import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Museum wird die Überarbeitungsgeschichte des Ausstellungsschildes anzeigen.",
        },
        {
          isCorrect: true,
          label:
            "Das Museum erhöht die Verlässlichkeit der Darstellung, indem es Dokumente, Erinnerungen und Unsicherheit trennt, statt eine Version zu erzwingen.",
        },
        {
          isCorrect: false,
          label:
            "Schriftliche Unterlagen sind immer richtig, während jede mündliche Aussage verworfen werden muss.",
        },
        {
          isCorrect: false,
          label:
            "Das Museum sollte die spannendste Geschichte wählen und störende Angaben entfernen.",
        },
        {
          isCorrect: false,
          label:
            "Das Museum wird Korrekturen mit einer überprüfbaren Quellenangabe annehmen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The museum will display the exhibition label's revision history.",
        },
        {
          isCorrect: true,
          label:
            "The museum improves the reliability of the account by distinguishing records, memories, and uncertainty rather than forcing one version to win.",
        },
        {
          isCorrect: false,
          label:
            "Written records are always correct, whereas all oral testimony must be rejected.",
        },
        {
          isCorrect: false,
          label:
            "The museum should choose the most engaging story and remove details that disrupt the narrative.",
        },
        {
          isCorrect: false,
          label:
            "The museum will accept corrections that include a verifiable source trail.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Museum akan menampilkan riwayat revisi label pameran.",
        },
        {
          isCorrect: true,
          label:
            "Museum meningkatkan keandalan keterangan dengan membedakan dokumen, ingatan, dan ketidakpastian, bukan dengan memaksa satu versi menang.",
        },
        {
          isCorrect: false,
          label:
            "Catatan tertulis selalu benar, sedangkan semua kesaksian lisan harus ditolak.",
        },
        {
          isCorrect: false,
          label:
            "Museum sebaiknya memilih kisah paling menarik dan menghapus keterangan yang mengganggu kelancaran cerita.",
        },
        {
          isCorrect: false,
          label:
            "Museum akan menerima koreksi yang dilengkapi asal sumber yang dapat diperiksa.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
