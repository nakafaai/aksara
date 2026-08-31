import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Schriftliche Unterlagen sind immer richtig, während jede mündliche Aussage verworfen werden muss.",
        },
        {
          isCorrect: true,
          label:
            "Ein Quellenkonflikt muss nicht beseitigt werden; das Museum sollte erklären, was belegt, erinnert und noch offen ist.",
        },
        {
          isCorrect: false,
          label:
            "Das Museum sollte die spannendste Geschichte wählen und störende Angaben entfernen.",
        },
        {
          isCorrect: false,
          label:
            "Das Museum wird die Überarbeitungsgeschichte des Ausstellungsschildes anzeigen.",
        },
        {
          isCorrect: false,
          label:
            "Das Museum erhöht die Verlässlichkeit der Darstellung, indem es Dokumente, Erinnerungen und Unsicherheit trennt, statt eine Version zu erzwingen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Written records are always correct, whereas all oral testimony must be rejected.",
        },
        {
          isCorrect: true,
          label:
            "A source conflict need not be erased; the museum should explain what is documented, remembered, and still open.",
        },
        {
          isCorrect: false,
          label:
            "The museum should choose the most engaging story and remove details that disrupt the narrative.",
        },
        {
          isCorrect: false,
          label:
            "The museum will display the exhibition label's revision history.",
        },
        {
          isCorrect: false,
          label:
            "The museum improves the reliability of the account by distinguishing records, memories, and uncertainty rather than forcing one version to win.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Catatan tertulis selalu benar, sedangkan semua kesaksian lisan harus ditolak.",
        },
        {
          isCorrect: true,
          label:
            "Perbedaan sumber tidak harus dihapus; museum perlu menjelaskan mana yang terbukti, diingat, dan masih terbuka.",
        },
        {
          isCorrect: false,
          label:
            "Museum sebaiknya memilih kisah paling menarik dan menghapus keterangan yang mengganggu kelancaran cerita.",
        },
        {
          isCorrect: false,
          label: "Museum akan menampilkan riwayat revisi label pameran.",
        },
        {
          isCorrect: false,
          label:
            "Museum meningkatkan keandalan keterangan dengan membedakan dokumen, ingatan, dan ketidakpastian, bukan dengan memaksa satu versi menang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
