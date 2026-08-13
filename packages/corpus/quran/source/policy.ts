import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { QuranSourceArtifactSchema } from "@nakafa/aksara-contracts/quran/source";

/** Domain that authenticates the complete ordered official data bundle. */
export const QURAN_SOURCE_BUNDLE_DOMAIN = "aksara.quran.source-bundle.v2";

/** Domain that authenticates the 114 ordered QuranEnc Tafsir responses. */
export const QURAN_TAFSIR_BUNDLE_DOMAIN = "aksara.quranenc.api-bundle.v1";

/** Builds one exact source artifact identity from pinned official bytes. */
function artifact(byteCount: number, digest: string, fileCount = 1) {
  return QuranSourceArtifactSchema.make({
    byteCount,
    digest: Sha256HashSchema.make(`sha256:${digest}`),
    fileCount,
  });
}

/** One source-controlled official file required by the Quran parser. */
export interface PinnedQuranFile {
  readonly artifact: ReturnType<typeof artifact>;
  readonly name: string;
  readonly path: string;
}

interface QuranSourcePolicy {
  readonly data: {
    readonly arabic: PinnedQuranFile;
    readonly english: PinnedQuranFile;
    readonly indonesian: PinnedQuranFile;
    readonly metadata: PinnedQuranFile;
  };
  readonly tafsir: {
    readonly artifact: ReturnType<typeof artifact>;
    readonly directory: string;
    readonly name: string;
  };
  readonly terms: {
    readonly quranenc: PinnedQuranFile;
    readonly tanzil: PinnedQuranFile;
  };
}

/** Complete physical and content identity for every pinned Quran source. */
export const QURAN_SOURCE_POLICY = {
  data: {
    arabic: {
      artifact: artifact(
        1_334_737,
        "ac0724796cbbda0f4801470fbbd11d0f3c5802067bae0493466d0128b0c667af"
      ),
      name: "tanzil-text.txt",
      path: "tanzil/text.txt",
    },
    english: {
      artifact: artifact(
        1_690_410,
        "213e1aeb515c5bac6ca446955527b8f3c0f9c21e9d1bad9c6857e9e5b282e9b6"
      ),
      name: "quranenc-en.xml",
      path: "quranenc/en.xml",
    },
    indonesian: {
      artifact: artifact(
        1_820_207,
        "45d0014236443e91af1338fe7b60f9e20741c6ff5b4ee82ead960d111f91071b"
      ),
      name: "quranenc-id.xml",
      path: "quranenc/id.xml",
    },
    metadata: {
      artifact: artifact(
        77_234,
        "8867c1d88191472adec9db694b3cd9f135b1a2ef580574d32cf888dcb22c5c7a"
      ),
      name: "tanzil-data.xml",
      path: "tanzil/data.xml",
    },
  },
  tafsir: {
    artifact: artifact(
      6_584_353,
      "b46b730418767dfacdf34ac35cec4277822a019b631910d603def280c3d56364",
      114
    ),
    directory: "quranenc/tafsir",
    name: "quranenc-tafsir",
  },
  terms: {
    quranenc: {
      artifact: artifact(
        1_051_521,
        "858791320276bef37616be75f3d57efac5b46463246d7cf5503aab1a6de2c774"
      ),
      name: "quranenc-terms.html",
      path: "quranenc/terms.html",
    },
    tanzil: {
      artifact: artifact(
        7903,
        "795064d93b6b9a9e2df190800a32bfe77add93eb6e978215ddb36f8e0130ccaa"
      ),
      name: "tanzil-terms.html",
      path: "tanzil/terms.html",
    },
  },
} satisfies QuranSourcePolicy;
