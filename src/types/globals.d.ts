/** Injected at build time by Vite's `define` — value comes from package.json version */
declare const __APP_VERSION__: string;

// CSS side-effect exports from this library have no type stubs; declare the
// entire package path wildcard so TS6's noUncheckedSideEffectImports is satisfied.
declare module '@macolmenerori/component-library/*' {}
