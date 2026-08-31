import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Dieselbe Einladung kann bei unterschiedlichen Bedingungen zu ungleichen Möglichkeiten führen.",
        },
        {
          isCorrect: false,
          label:
            "Eine Beratung ist nur gültig, wenn jeder Vorschlag angenommen wird.",
        },
        {
          isCorrect: false,
          label:
            "Wegen der offenen Einladung müssen Herkunft und Abwesenheitsgründe nicht geprüft werden.",
        },
        {
          isCorrect: false,
          label:
            "Fast alle ersten Redebeiträge kamen aus den drei nächstgelegenen Vierteln.",
        },
        {
          isCorrect: false,
          label:
            "Die endgültige Entscheidung wird Auswahl, Einwände und Einfluss der Beiträge festhalten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The same invitation can produce unequal opportunities when participants face different conditions.",
        },
        {
          isCorrect: false,
          label:
            "A consultation is valid only if every resident proposal is ultimately accepted.",
        },
        {
          isCorrect: false,
          label:
            "Because the invitation was open, participant origins and reasons for absence need not be examined.",
        },
        {
          isCorrect: false,
          label:
            "Nearly every initial speaker came from the three nearest neighbourhoods.",
        },
        {
          isCorrect: false,
          label:
            "The final decision will record the choice, objections, and the influence of contributions.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Undangan yang sama dapat menghasilkan kesempatan yang tidak sama ketika kondisi peserta berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Musyawarah hanya sah jika setiap usulan warga akhirnya diterima.",
        },
        {
          isCorrect: false,
          label:
            "Karena undangan terbuka, asal peserta dan alasan ketidakhadiran tidak perlu diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Hampir seluruh pembicara pertama berasal dari tiga rukun tetangga terdekat.",
        },
        {
          isCorrect: false,
          label:
            "Keputusan akhir akan mencatat pilihan, keberatan, dan pengaruh masukan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
