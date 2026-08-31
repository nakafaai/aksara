import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Der Schlaf von Tieren beweist, dass Katzen von ihren Aktivitäten im Wachzustand träumen.",
        },
        {
          isCorrect: false,
          label:
            "Jeder Traum wiederholt ein neues Erlebnis genau und stärkt dadurch diese Erinnerung.",
        },
        {
          isCorrect: false,
          label:
            "Träume entstehen nur im REM-Schlaf, weil das Gehirn in allen anderen Phasen inaktiv ist.",
        },
        {
          isCorrect: true,
          label:
            "Träume hängen mit der Aktivität des schlafenden Gehirns und Bruchstücken von Erlebnissen zusammen, ihre genaue Funktion wird aber weiter erforscht.",
        },
        {
          isCorrect: false,
          label:
            "Der Zweck des Träumens ist vollständig geklärt, weitere Forschung ist daher unnötig.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Animal sleep proves that cats dream about activities they perform while awake.",
        },
        {
          isCorrect: false,
          label:
            "Every dream directly replays a recent waking experience and strengthens that memory.",
        },
        {
          isCorrect: false,
          label:
            "Only REM sleep produces dreams because the brain is inactive in every other stage.",
        },
        {
          isCorrect: true,
          label:
            "Dreams draw on sleeping-brain activity and fragments of waking experience, but their precise function remains under study.",
        },
        {
          isCorrect: false,
          label:
            "The purpose of dreaming is fully understood, so further research is unnecessary.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tidur pada hewan membuktikan bahwa kucing bermimpi tentang kegiatan yang dilakukannya ketika terjaga.",
        },
        {
          isCorrect: false,
          label:
            "Setiap mimpi menayangkan ulang pengalaman baru secara persis dan memperkuat ingatan tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Mimpi hanya terjadi dalam tidur REM karena otak tidak aktif pada tahap lainnya.",
        },
        {
          isCorrect: true,
          label:
            "Mimpi berkaitan dengan aktivitas otak saat tidur dan potongan pengalaman terjaga, tetapi fungsi tepatnya masih diteliti.",
        },
        {
          isCorrect: false,
          label:
            "Tujuan mimpi sudah dipahami sepenuhnya sehingga tidak perlu diteliti lagi.",
        },
      ],
    },
  },
};

export default item;
