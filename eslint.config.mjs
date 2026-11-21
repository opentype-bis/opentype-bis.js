import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      globals: {
        console: "readonly",
        // ugly platform-dependant classes and objects
        DecompressionStream: "readonly",
        Response: "readonly",
        TextDecoder: "readonly",
        SVGPathElement: "readonly",
        DOMParser: "readonly",
        Image: "readonly",
        document: "readonly",
      }
    },
    rules: {
      // Formatting (indent, quotes, semicolons, line breaks) is delegated to
      // Prettier — see .prettierrc.json. eslint-config-prettier (applied last,
      // below) disables any ESLint stylistic rules that would conflict.
      "no-restricted-syntax": [
        "error",
        {
          "message": "For consistency, Use `for()` loops instead of `.forEach()`",
          "selector": "MemberExpression > Identifier[name=\"forEach\"]"
        }
      ],
      // ESLint 10's recommended set added these two rules, which flag
      // pre-existing patterns in parser / hinting code (dead-store assignments
      // and one never-assigned debug variable in hintingtt.mjs). Disabled to
      // avoid a wholesale rewrite; re-enable and clean up incrementally.
      "no-useless-assignment": "off",
      "no-unassigned-vars": "off",
      // Node.js compatibility guard: the library must run in Node as well as the
      // browser, so these browser-only globals (absent in Node) are forbidden in
      // src. Browser-only features should feature-detect (e.g.
      // `typeof window !== 'undefined'`) rather than reference them directly.
      // NOTE: document/DOMParser/Image are intentionally *not* restricted — they
      // are used in the browser-only SVG color-glyph path (src/svgimages.mjs).
      "no-restricted-globals": [
        "error",
        { "name": "window", "message": "Not available in Node.js — feature-detect with `typeof window !== 'undefined'` before use." },
        { "name": "self", "message": "Not available in Node.js — feature-detect before use." },
        { "name": "navigator", "message": "Not available in Node.js — feature-detect before use." },
        { "name": "location", "message": "Not available in Node.js — feature-detect before use." },
        { "name": "localStorage", "message": "Not available in Node.js — feature-detect before use." },
        { "name": "sessionStorage", "message": "Not available in Node.js — feature-detect before use." },
        { "name": "history", "message": "Not available in Node.js — feature-detect before use." },
        { "name": "screen", "message": "Not available in Node.js — feature-detect before use." }
      ]
    }
  },
  // Must come last: turns off ESLint formatting rules in favour of Prettier.
  prettier,
];
