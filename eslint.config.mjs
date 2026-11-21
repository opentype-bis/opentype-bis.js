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
      "no-unassigned-vars": "off"
    }
  },
  // Must come last: turns off ESLint formatting rules in favour of Prettier.
  prettier,
];
