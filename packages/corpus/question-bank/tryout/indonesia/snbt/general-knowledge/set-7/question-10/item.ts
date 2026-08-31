import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
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
          isCorrect: true,
          label:
            "Inklusiv bedeutet praktikable Wege zur Berücksichtigung verschiedener Gruppen, nicht den Sieg jeder Forderung.",
        },
        {
          isCorrect: false,
          label:
            "Inklusive Beteiligung verlangt den Abbau tatsächlicher Hindernisse und die Prüfung der Repräsentation, nicht nur eine offene Einladung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
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
          isCorrect: true,
          label:
            "Inclusive means providing workable ways for different groups to be considered, not guaranteeing that every demand wins.",
        },
        {
          isCorrect: false,
          label:
            "Inclusive participation requires reducing practical barriers and examining representation, not merely issuing an open invitation.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
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
          isCorrect: true,
          label:
            "Inklusif berarti menyediakan cara yang layak agar beragam kelompok dapat dipertimbangkan, bukan menjamin semua tuntutan menang.",
        },
        {
          isCorrect: false,
          label:
            "Partisipasi yang inklusif menuntut pengurangan hambatan nyata dan pemeriksaan keterwakilan, bukan sekadar undangan terbuka.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
