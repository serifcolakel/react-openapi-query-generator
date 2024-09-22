/* eslint-disable @typescript-eslint/no-unsafe-function-type */
"use client";

import { AlertCircle, Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import { toast } from "sonner";

/**
 * @description: Test handler type
 */
export type ArgumentTypes<F extends Function> = F extends (
  ...args: infer A
) => unknown
  ? A
  : never;

export default function TestPage() {
  const [editorValues, setEditorValues] = useState<Record<string, string>>({});
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/todos");
  const [response, setResponse] = useState<unknown>();

  const [loading, setLoading] = useState(false);

  const editorRef = useRef<ArgumentTypes<OnMount>[0]>();

  useEffect(() => {
    return () => {
      editorRef.current?.setModel(null);
      editorRef.current?.dispose();
      editorRef.current = undefined;
    };
  }, []);

  const handleEditorChange: OnChange = (value) => {
    setEditorValues({
      ...editorValues,
      test: value || "",
    });
  };

  const fetchUrl = async () => {
    setLoading(true);

    try {
      const newUrl = new URL(url);
      const response = await fetch(newUrl.href);
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      toast("Failed to fetch URL", {
        action: {
          label: "Reset",
          onClick: () => {
            setUrl("");
          },
        },
        icon: <AlertCircle />,
        classNames: {
          icon: "text-destructive",
          description: "text-destructive",
          title: "text-destructive",
        },
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Loader className="animate-spin" />
      </div>
    );
  }

  const handleOnMount: OnMount = (editor, monaco) => {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });

    // compiler options
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2015,
      allowNonTsExtensions: true,
    });

    const libSource = [
      "declare class Requester {",
      "  static test(message: string, callback: () => void): void;",
      "  static expect(value: unknown): {",
      "    to: {",
      "      be: {",
      "        below(value: number): void;",
      "        above(value: number): void;",
      "        equal(value: unknown): void;",
      "      };",
      "      not: {",
      "        be: {",
      "          below(value: number): void;",
      "          above(value: number): void;",
      "          equal(value: unknown): void;",
      "        };",
      "      };",
      "    };",
      "  };",
      "  static response: {",
      "    to: {",
      "      have: {",
      "        status(status: number): void;",
      "      };",
      "    };",
      "    data: unknown;",
      "    status: number;",
      "    responseTime: number;",
      "  };",
      "  static environment: {",
      "    set(key: string, value: unknown): void;",
      "    replace(key: string, value: unknown): void;",
      "    get(key: string): unknown;",
      "    unset(key: string): void;",
      "  };",
      "  static helpers: {",
      "    isEqual(value: unknown, expected: unknown): void;",
      "  };",
      "}",
    ].join("\n");

    monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource);

    editorRef.current = editor;
  };

  return (
    <div className="h-screen space-y-4">
      <div className="flex flex-row gap-x-4">
        <Input
          className="w-full"
          placeholder="Enter URL"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={fetchUrl} disabled={!url}>
          Fetch
        </Button>
      </div>
      <div className="relative w-full h-full">
        <Editor
          className="h-full overflow-hidden border rounded-lg shadow-sm"
          defaultLanguage="javascript"
          defaultValue={JSON.stringify(response, null, 2)}
          onChange={handleEditorChange}
          onMount={handleOnMount}
          value={editorValues.test}
        />
      </div>
    </div>
  );
}
