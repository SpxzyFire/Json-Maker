// Initialize Monaco Editors
const loaderScript = document.createElement("script");
loaderScript.src = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs/loader.min.js";
loaderScript.onload = function () {
  window.require.config({
    paths: {
      vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs",
    },
  });

  window.require(["vs/editor/editor.main"], function () {
    blockEditor = monaco.editor.create(document.getElementById("blockEditor"), {
      value: "{}",
      language: "json",
      theme: "vs",
      fontSize: 16,
      lineHeight: 24,
      minimap: { enabled: true },
      lineNumbers: "on",
      wordWrap: "off",
      autoClosingBrackets: "always",
      readOnly: false, // Allow editing
    });

    const schema = {
      type: "object",
      properties: {
        version: { type: "number" },
        back: { $ref: "#/definitions/item" },
        leftHand: { $ref: "#/definitions/item" },
        rightHand: { $ref: "#/definitions/item" },
        leftHip: { $ref: "#/definitions/item" },
        rightHip: { $ref: "#/definitions/item" },
      },
      definitions: {
        item: {
          type: "object",
          properties: {
            itemID: { type: "string", enum: itemIDs.map(item => item.id) },
            colorHue: { type: "number" },
            colorSaturation: { type: "number" },
            scaleModifier: { type: "number" },
            children: { type: "array", items: { $ref: "#/definitions/item" } },
            ammo: { type: "number" },
          },
          required: ["itemID"],
        },
      },
    };

    manualEditor = monaco.editor.create(document.getElementById("manualEditor"), {
      value: JSON.stringify({ version: 1 }, null, 2),
      language: "json",
      theme: "vs",
      fontSize: 16,
      lineHeight: 24,
      minimap: { enabled: true },
      lineNumbers: "on",
      wordWrap: "off",
      autoClosingBrackets: "always",
      suggest: {
        showWords: true,
        showFields: true,
        showValues: true,
      },
    });

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        {
          uri: "http://myschema/item-forge",
          fileMatch: ["*"],
          schema: schema,
        },
      ],
    });

    // Event listeners for block editor settings
    document.getElementById("editorTheme").addEventListener("change", (e) => {
      monaco.editor.setTheme(e.target.value);
    });

    document.getElementById("fontSize").addEventListener("input", (e) => {
      blockEditor.updateOptions({ fontSize: parseInt(e.target.value) });
    });

    document.getElementById("lineHeight").addEventListener("input", (e) => {
      blockEditor.updateOptions({ lineHeight: parseInt(e.target.value) });
    });

    document.getElementById("minimap").addEventListener("change", (e) => {
      blockEditor.updateOptions({ minimap: { enabled: e.target.value === "true" } });
    });

    document.getElementById("lineNumbers").addEventListener("change", (e) => {
      blockEditor.updateOptions({ lineNumbers: e.target.value });
    });

    document.getElementById("wordWrap").addEventListener("change", (e) => {
      blockEditor.updateOptions({ wordWrap: e.target.value });
    });

    document.getElementById("autoClosingBrackets").addEventListener("change", (e) => {
      blockEditor.updateOptions({ autoClosingBrackets: e.target.value });
    });

    // Event listeners for manual editor settings
    document.getElementById("manualEditorTheme").addEventListener("change", (e) => {
      monaco.editor.setTheme(e.target.value);
    });

    document.getElementById("manualFontSize").addEventListener("input", (e) => {
      manualEditor.updateOptions({ fontSize: parseInt(e.target.value) });
    });

    document.getElementById("manualLineHeight").addEventListener("input", (e) => {
      manualEditor.updateOptions({ lineHeight: parseInt(e.target.value) });
    });

    document.getElementById("manualMinimap").addEventListener("change", (e) => {
      manualEditor.updateOptions({ minimap: { enabled: e.target.value === "true" } });
    });

    document.getElementById("manualLineNumbers").addEventListener("change", (e) => {
      manualEditor.updateOptions({ lineNumbers: e.target.value });
    });

    document.getElementById("manualWordWrap").addEventListener("change", (e) => {
      manualEditor.updateOptions({ wordWrap: e.target.value });
    });

    document.getElementById("manualAutoClosingBrackets").addEventListener("change", (e) => {
      manualEditor.updateOptions({ autoClosingBrackets: e.target.value });
    });
  });
};
document.head.appendChild(loaderScript);
