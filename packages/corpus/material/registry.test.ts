import { resolve } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { Effect, FileSystem } from "effect";

import {
  decodeMaterialDomains,
  MaterialDomainMissingError,
} from "#corpus/material/domain";
import { decodeMaterialPreviewEntry } from "#corpus/material/preview";
import { decodeMaterialRegistry } from "#corpus/material/registry";
import {
  lessonMaterialEntries,
  lessonMaterialSource,
} from "#corpus/test/material";

const corpusRoot = resolve(import.meta.dirname, "..", "..", "..");
const englishIndonesianLocales = ActiveAppLocaleListSchema.make([
  AppLocaleSchema.make("en"),
  AppLocaleSchema.make("id"),
]);

/** Decodes injected sources for one explicit publication locale subset. */
function decodeEmbeddedRegistry(input: unknown) {
  return decodeMaterialRegistry(input, undefined, englishIndonesianLocales);
}

/** Returns one typed registry failure for native Effect test composition. */
function rejectRegistry(input: unknown) {
  return decodeEmbeddedRegistry(input).pipe(Effect.flip);
}

layer(NodeServices.layer)("material registry", (it) => {
  it.effect(
    "projects every authored locale body onto its checked-in source path",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const entries = yield* decodeMaterialRegistry();
        const authoredPaths = (yield* fileSystem.glob(
          "packages/corpus/material/lesson/**/*.mdx",
          { root: corpusRoot }
        ))
          .filter((sourcePath) =>
            ACTIVE_APP_LOCALES.some((locale) =>
              sourcePath.endsWith(`/${locale}.mdx`)
            )
          )
          .sort();
        const projectedPaths = entries
          .map(({ sourcePath }) => sourcePath)
          .sort();

        expect(entries).toHaveLength(1149);
        expect(
          new Set(entries.map(({ route }) => route.materialKey)).size
        ).toBe(36);
        for (const locale of ACTIVE_APP_LOCALES) {
          expect(
            entries.filter(({ route }) => route.appLocale === locale)
          ).toHaveLength(383);
        }
        expect(new Set(projectedPaths).size).toBe(1149);
        expect(projectedPaths).toEqual(authoredPaths);

        const representativeKeys = new Set([
          "material/lesson/ai-ds/ai-programming/arithmetic-operator",
          "material/lesson/biology/biodiversity/bacteria",
          "material/lesson/chemistry/structure-matter/atom-shell",
          "material/lesson/mathematics/function-composition-inverse-function/function-concept",
          "material/lesson/physics/kinematics/acceleration",
        ]);
        expect(
          entries
            .filter(({ route }) => representativeKeys.has(route.contentKey))
            .map(({ route }) => route.publicPath)
        ).toEqual([
          "faecher/ki-und-data-science/ki-programmierung/rechenoperatoren",
          "subjects/ai-ds/ai-programming/arithmetic-operator",
          "materi/ai-ds/pemrograman-ai/operator-aritmatika",
          "faecher/biologie/vielfalt-der-lebewesen/bakterien",
          "subjects/biology/biodiversity/bacteria",
          "materi/biologi/keanekaragaman-makhluk-hidup/bakteri",
          "faecher/chemie/atombau/elektronenhuelle",
          "subjects/chemistry/structure-matter/atom-shell",
          "materi/kimia/struktur-atom/kulit-atom",
          "faecher/mathematik/funktionskomposition-und-umkehrfunktion/funktionsbegriff",
          "subjects/mathematics/function-composition-inverse-function/function-concept",
          "materi/matematika/fungsi-komposisi-dan-fungsi-invers/konsep-fungsi",
          "faecher/physik/kinematik/beschleunigung",
          "subjects/physics/kinematics/acceleration",
          "materi/fisika/kinematika/percepatan",
        ]);
      })
  );

  it.effect("derives exact localized routes from one material source", () =>
    Effect.gen(function* () {
      const entries = yield* decodeEmbeddedRegistry([lessonMaterialSource()]);

      expect(entries).toEqual(lessonMaterialEntries());
    })
  );

  it.effect(
    "projects German metadata from the same source-owned locale maps",
    () =>
      Effect.gen(function* () {
        const source = lessonMaterialSource();
        const descriptors = yield* decodeMaterialDomains();
        const entries = yield* decodeMaterialRegistry(
          [source],
          descriptors,
          ActiveAppLocaleListSchema.make([AppLocaleSchema.make("de")])
        );

        expect(entries).toHaveLength(1);
        expect(entries[0]?.route).toMatchObject({
          appLocale: "de",
          publicPath:
            "faecher/mathematik/funktionskomposition-und-umkehrfunktion/funktionsbegriff",
        });
      })
  );

  it.effect("expands a generic domain through one corpus descriptor", () =>
    Effect.gen(function* () {
      const source = {
        ...lessonMaterialSource(),
        assetRoot: "material/lesson/earth-science/geology",
        domain: "earth-science",
        key: "lesson.earth-science.geology",
        routeSlugs: { en: "geology", id: "geologi" },
        sections: [
          {
            ...lessonMaterialSource().sections[0],
            routeSlugs: { en: "rocks", id: "batuan" },
            slug: "rocks",
          },
        ],
        slug: "geology",
      };
      const domains = yield* decodeMaterialDomains([
        {
          key: "earth-science",
          rendererDomain: "physics",
          routeSlugs: { en: "earth-science", id: "ilmu-bumi" },
        },
      ]);
      const entries = yield* decodeMaterialRegistry(
        [source],
        domains,
        englishIndonesianLocales
      );

      expect(entries).toHaveLength(2);
      expect(entries[0]).toMatchObject({
        rendererDomain: "physics",
        route: {
          publicPath: "subjects/earth-science/geology/rocks",
        },
      });
      expect(entries[1]).toMatchObject({
        rendererDomain: "physics",
        route: {
          publicPath: "materi/ilmu-bumi/geologi/batuan",
        },
      });
    })
  );

  it.effect("rejects a source whose domain has no reviewed descriptor", () =>
    Effect.gen(function* () {
      const error = yield* decodeMaterialRegistry(
        [lessonMaterialSource()],
        [],
        englishIndonesianLocales
      ).pipe(Effect.flip);

      expect(error).toBeInstanceOf(MaterialDomainMissingError);
      expect(error).toMatchObject({
        key: "mathematics",
        owner: "lesson.mathematics.function-composition-inverse-function",
      });
    })
  );

  it.effect(
    "maps malformed catalogs and invalid projections to typed failures",
    () =>
      Effect.gen(function* () {
        const malformed = yield* rejectRegistry(null);
        const invalidSource = {
          ...lessonMaterialSource(),
          assetRoot: `material/lesson/mathematics/${"a".repeat(490)}`,
        };
        const [overlong, preview] = yield* Effect.all([
          rejectRegistry([invalidSource]),
          decodeMaterialPreviewEntry(
            CorpusSourcePathSchema.make(
              `packages/corpus/${invalidSource.assetRoot}/function-concept/en.mdx`
            ),
            [invalidSource]
          ).pipe(Effect.flip),
        ]);

        expect(malformed._tag).toBe("MaterialCatalogError");
        expect(overlong._tag).toBe("MaterialRegistryError");
        expect(preview._tag).toBe("MaterialRegistryError");
      })
  );

  it.effect("rejects duplicate material keys and asset roots", () =>
    Effect.gen(function* () {
      const duplicateKey = yield* rejectRegistry([
        lessonMaterialSource(),
        {
          ...lessonMaterialSource(),
          assetRoot: "material/lesson/mathematics/alternate-functions",
          slug: "alternate-functions",
        },
      ]);
      const duplicateRoot = yield* rejectRegistry([
        lessonMaterialSource(),
        {
          ...lessonMaterialSource(),
          key: "lesson.mathematics.alternate-functions",
          slug: "alternate-functions",
        },
      ]);

      expect(duplicateKey).toMatchObject({
        _tag: "MaterialKeyError",
        materialKey: "lesson.mathematics.function-composition-inverse-function",
      });
      expect(duplicateRoot).toMatchObject({
        _tag: "MaterialRootError",
        assetRoot:
          "material/lesson/mathematics/function-composition-inverse-function",
      });
    })
  );

  it.effect("rejects duplicate locale heads and public routes", () =>
    Effect.gen(function* () {
      const source = lessonMaterialSource();
      const [section] = source.sections;
      const duplicateHead = yield* rejectRegistry([
        { ...source, sections: [section, section] },
      ]);
      const duplicateRoute = yield* rejectRegistry([
        source,
        {
          ...source,
          assetRoot: "material/lesson/mathematics/alternate-functions",
          key: "lesson.mathematics.alternate-functions",
          sections: [{ ...section, slug: "alternate-section" }],
          slug: "alternate-functions",
        },
      ]);
      expect(duplicateHead).toMatchObject({
        _tag: "MaterialIdentityError",
        artifactLocale: "en",
      });
      expect(duplicateRoute).toMatchObject({
        _tag: "MaterialRouteError",
        appLocale: "en",
        publicPath:
          "subjects/mathematics/function-composition-inverse-function/function-concept",
      });
    })
  );

  it.effect("allows an empty source catalog without inventing entries", () =>
    Effect.gen(function* () {
      expect(yield* decodeEmbeddedRegistry([])).toEqual([]);
    })
  );
});
