import Editor, { OnChange, Theme as EditorTheme } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { Theme, useTheme } from "./components/theme-provider";

import { Loader } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Charts } from "./pages/charts";
import TestPage from "./pages/request";

const editorThemes: Record<Theme, EditorTheme> = {
  light: "light",
  dark: "vs-dark",
  system: "light",
};

function App() {
  const [editorValues, setEditorValues] = useState({ body: "" });
  const [todos, setTodos] = useState([]);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const getTodos = async () => {
    setLoading(true);
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await response.json();

    setTodos(todos);
    setLoading(false);
    toast("Event has been created.", {
      action: {
        label: "Undo",
        onClick: () => {
          console.log("Undo clicked");
        },
      },
      important: true,
      richColors: true,
    });
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleEditorChange: OnChange = (value) => {
    setEditorValues({
      ...editorValues,
      body: value || "",
    });
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="relative">
          {loading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center h-full rounded-lg bg-primary-foreground bg-opacity-20">
              <Loader className="w-10 h-10 text-primary animate-spin" />
            </div>
          )}
          <Editor
            className="w-full overflow-hidden border rounded-lg shadow-sm"
            defaultLanguage="json"
            theme={editorThemes[theme]}
            height="60vh"
            loading={loading}
            width={"100%"}
            onChange={handleEditorChange}
            value={JSON.stringify(todos ?? [], null, 2)}
          />
        </TabsContent>
        <TabsContent value="password">
          <TestPage />
        </TabsContent>
        <TabsContent value="charts">
          <Charts />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
